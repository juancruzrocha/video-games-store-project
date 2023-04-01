import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./ShoppingCartItem.module.scss";
import { useEffect } from "react";

export const ShoppingCartItem = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loginWithRedirect }: any = useAuth0();
  // const userShoppingCartEmpty = useAppSelector((state) => state.shoppingCartReducer.emptyUserDBShoppingCart)

  // Aramis: Este condicional tiene que ser un ternario.
  if (listProductsShoppingCart.length > 0) {
    return (
      <>
        <table className={style.table}>
          <tbody className={style.tbody}>
            {listProductsShoppingCart.map((item: any, index) => (
              <tr key={index}>
                <td className={style.item}> {item.name}</td>
                <td className={style.item}> ${item.price}</td>
              </tr>
            ))}
            <tr className={style.priceTotal}>
              <td>Amount Payable{` $${totalAmount}`}</td>
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
      </>
    );
  } else {
    return (
      <div>
        <p className={style.cartClean}>Empty Shopping Car</p>
      </div>
    );
  }
};
