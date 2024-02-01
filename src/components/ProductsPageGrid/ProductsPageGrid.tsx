import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import '../../styles/mixins.scss';
import './container.scss';
import { Loader } from '../Loader';
import { Card } from '../Card';
import { Search } from '../Search';
import { ItemsFromServer } from '../../types/ItemsFromServer';
import { Product } from '../../types/ProductEntity';
import { Pagination, SortType, SortOrder } from '../../types/sortType';
import { Categories } from '../../types/categories';
import noProductFound from '../../images/no-product-found.svg';

type Props = {
  productEntities: ItemsFromServer | null;
  products: Product[];
  onPaginationSelect: Dispatch<SetStateAction<string>>;
  getSearch: (arg: string) => void;
  isLoading: boolean;
  isError: string | unknown | null,
  onSortBySelect: Dispatch<SetStateAction<string>>;
  onSortTypeSelect: Dispatch<SetStateAction<string>>;
};

export const ProductsPageGrid: React.FC<Props> = ({
  productEntities,
  products,
  onPaginationSelect,
  getSearch,
  isLoading,
  isError,
  onSortBySelect,
  onSortTypeSelect,
}) => {
  const countOfGoods = productEntities ? productEntities.count : 0;

  const [categoryHeaderName, setCategoryHeaderName] = useState<string | undefined>('');

  useEffect(() => {
    const { hash } = window.location;
    const trimmedCategoryName = hash.substring(2);
    let categoryName;

    switch (trimmedCategoryName) {
      case 'phones': {
        categoryName = Categories.MOBIES;
        break;
      }

      case 'tablets': {
        categoryName = Categories.TABLETS;
        break;
      }

      case 'accessories': {
        categoryName = Categories.ACCESSORIES;
        break;
      }

      default:
        break;
    }

    setCategoryHeaderName(categoryName?.toString());
  }, [products]);

  return (
    <>
      <div className="card-container">
        <br />
        <h1 className="category__title">{categoryHeaderName}</h1>
        <p className="description">{`${countOfGoods} models`}</p>

        <div className="params-container">
          <div className="sort">
            <div className="sorter">
              <label
                htmlFor="sort__pagination"
                className="pagination__description"
              >
                Items on page
              </label>
              <select
                name=""
                id=""
                className="select__pagination"
                onChange={(event) => onPaginationSelect(event.target.value)}
              >
                <option value={Pagination.Sixteen}>{Pagination.Sixteen}</option>
                <option value={Pagination.ThirtyTwo}>
                  {Pagination.ThirtyTwo}
                </option>
                <option value={Pagination.SixtyFour}>
                  {Pagination.SixtyFour}
                </option>
              </select>
            </div>
            <div className="sorter">
              <label htmlFor="sort__sort-by" className="sort-by__description">
                Sort by
              </label>
              <select
                name=""
                id=""
                className="sort__sort-by"
                onChange={(event) => onSortBySelect(event.target.value)}
              >
                <option value={SortType.Newest}>{SortType.Newest}</option>
                <option value={SortType.Price}>{SortType.Price}</option>
                <option value={SortType.Screen}>{SortType.Screen}</option>
              </select>
            </div>
            <div className="sorter">
              <label
                htmlFor="sort__sort-order"
                className="sort-order__description"
              >
                Sort order
              </label>
              <select
                name=""
                id=""
                className="sort__sort-order"
                onChange={(event) => onSortTypeSelect(event.target.value)}
              >
                <option value={SortOrder.ASC}>From low to high</option>
                <option value={SortOrder.DESC}>From high to low</option>
              </select>
            </div>
          </div>

          <div>
            <Search handleSearch={getSearch} />
          </div>
        </div>
      </div>

      {isLoading && !isError && (
        <div className="container-loading">
          <Loader />
        </div>
      )}

      {(products && products.length > 0)
        ? (
          <div className="container">
            {products.map((good) => (
              <Card productData={good} key={good.id} />))}
          </div>
        )
        : (
          <div className="container-img">
            <img src={noProductFound} alt="no productfound" />
          </div>
        )}
    </>
  );
};

export default ProductsPageGrid;
