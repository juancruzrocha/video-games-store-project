import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./ShoppingCartItem.module.scss";
import { useEffect, useState } from "react";
import {
  getProductSoppingCart,
  removeProductOfShoppingCart,
} from "../../redux/actions/shoppingCartAction";
import { RootState } from "../../redux/store";
import { ShoppingCartType } from "../../redux/interfaces/shoppingCartInterface";

export const ShoppingCartItem = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loginWithRedirect }: any = useAuth0();
  const [productList, setproductList] = useState<ShoppingCartType[]>([]);
  const productsInShoopingCart = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.productListShoopingCart
  );
  //AramisWarning: Esto esta haciendo un bucle infinito
  useEffect(() => {
    if (user && productList.length !== productsInShoopingCart.length) {
      // AramisWarning: tengo que mejorar esta condicion, soluciona el bucle infinito pero no todo
      dispatch(getProductSoppingCart(user.email));
      setproductList(productsInShoopingCart);
      return;
    }
    setproductList(productsInShoopingCart);
  }, [productsInShoopingCart]); // productsInShoopingCart tengo que ver porque esta dependencia se me hace el bucle infinito

  return (
    <>
      {productList.length ? (
        <div>
          <table className={style.table}>
            <tbody className={style.tbody}>
              {productList.map((item: any, index) => (
                <tr key={index}>
                  <td className={style.item}> {item.name}</td>
                  <td className={style.item}> ${item.price}</td>
                  <button
                    onClick={() =>
                      user
                        ? dispatch(
                            removeProductOfShoppingCart(user.email, item.id)
                          )
                        : dispatch(
                            removeProductOfShoppingCart("noLoginUser", item.id)
                          )
                    }
                  >
                    X
                  </button>
                </tr>
              ))}
              <tr className={style.priceTotal}>
                {/* <td>Amount Payable{` $${totalAmount}`}</td> */}
              </tr>
            </tbody>
          </table>
          {}
          <button className={style.checkout}>
            {isAuthenticated ? (
              <Link to="/checkout">
                <p>CHECKOUT</p>
              </Link>
            ) : (
              <p onClick={() => loginWithRedirect()}>Please LogIn</p>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p className={style.cartClean}>Empty Shopping Car</p>
          </div>
        </div>
      )}
    </>
  );
};
