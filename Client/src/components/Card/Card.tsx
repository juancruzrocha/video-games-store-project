import carIcon from "../../assets/shopping-cart-add-button_icon-icons.com_56132.svg";
import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { addShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addNewProductInShoppingCart } from "../../redux/actions/shoppingCartAction";
import { addAmountForShoppingCartUser } from "../../redux/reducer/shoppingCartReducer";
import { saveShoppingCartInLocalStorage } from "../../redux/actions/localStorageAction";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADDED_TO_CART } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addProductToWishList,
  checkIfProductWasPurchased,
} from "../../Controller/cardController";
import { setwishList } from "../../redux/reducer/wishReducer";
import { CardProps } from "./interfaces/interfaces";
import { RootState } from "../../redux/store";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres,
  state,
}: CardProps) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated }: any = useAuth0();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [control, setControl] = useState<number>(-1);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [saveInLocalStorage, setSaveInLocalStorage] = useState<boolean>(false);
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });

  let totalPrice = useAppSelector(
    (state: RootState) => state.shoppingCartReducer.totalAmount
  );

  let todaysDiscount = useAppSelector(
    (state: RootState) => state.productReducer.todaysDiscount
  );

  useEffect(() => {
    if (saveInLocalStorage) {
      dispatch(
        saveShoppingCartInLocalStorage(listProductsShoppingCart, discountPrice)
      );
    }
    //esto verifica si el producto esta comprado, para cambiar el boton
  }, [control, user]);

  useEffect(() => {
    if (user) {
      checkIfProductWasPurchased(user.email, id).then((check) =>
        check
          ? setChangeClass({
              classButton: styles.buttonHide,
              classCard: styles.cardContainerBuy,
            })
          : setChangeClass({
              classButton: styles.buttonAdd,
              classCard: styles.cardContainer,
            })
      );
    }
  }, []);

  useEffect(() => {
    if (
      Number(price) &&
      // todaysDiscount?.gen !== "No_Discount" && //Aramis:esta comparacion esta mal,  todaysDiscount?.discount es de tipo number y aqui la compara con una string
      genres.includes(String(todaysDiscount?.genre)) &&
      Number(price) !== discountPrice &&
      !discountApplied
    ) {
      let finalPrice = Number(
        (((100 - todaysDiscount.discount) * Number(price)) / 100).toFixed(2)
      );

      setDiscountApplied((prev) => (prev = true)); // Aramis:Esto esta raro, como que no tiene sentido el "prev = true"
      setDiscountPrice(finalPrice);
    }
  }, [price]);

  //IMPORTANTT Aramis: Todo esto no se si tiene algun uso en comun, lo unico que hace es traer cosas del estado global.
  if (user) {
    //Aramis: esto estaba asi "typeof user !== "undefined"", es muy rebuscado y no tiene sentido
    var listProductsShoppingCart: object[] = useAppSelector(
      //Aramis:Por como esta usado el codigo obliga a usar variables con var y no es necesario, es mejor encapsular el codigo y los useAppSelector dejarlos afuera como todos los hooks
      (state) => state.shoppingCartReducer.listProductsShoppingCartUser
    );
  } else {
    var listProductsShoppingCart: object[] = useAppSelector(
      (state) => state.shoppingCartReducer.listProductsShoppingCartGuest
    );
    var totalAmount: number = totalPrice; // Aramis: Esto parece no usarse.
  }

  const addingToShoppingCart = () => {
    //Aramis: Esto "game" no entiendi porque existe, tenemos las propiedades de arriba que entran al componente y esto es lo mismo. Estamos repitiendo cosas.
    const game = {
      id,
      name,
      background_image,
      price,
      genres,
    };
    //Si no esta el Producto en el carrito y
    if (user) {
      //si existe un usuario lo agrega al Carrito del USUARIO
      dispatch(addNewProductInShoppingCart(id, user.email));
      dispatch(addAmountForShoppingCartUser(price));
      setSuccessMsg(ADDED_TO_CART);
    } else {
      dispatch(addShoppingCart(game)); // Aramis:Se podria mandar directamente el objeto de props del componente y listo.
      setControl(listProductsShoppingCart.length); // Aramis: Esto no se bien para que sirve.
      setSaveInLocalStorage(true);
    }
  };

  const addingToWishList = async () => {
    const newWishList = await addProductToWishList(user.email, id);
    dispatch(setwishList(newWishList));
  };

  return (
    <>
      <div className={changeClass.classCard}>
        <div className={styles.card}>
          {state ? (
            <Link to={`/${id}`}>
              <img src={background_image} alt={name} />
            </Link>
          ) : (
            <>
              <Link to={"/products"}>
                <img src={background_image} alt={name} />
              </Link>
            </>
          )}
          <div className={styles.containerTittleAndPrice}>
            <h3>{name}</h3>
            {discountApplied ? (
              <div>
                <del>{`${price}`}</del>
                <p>ON SALE: {`${discountPrice}`}</p>
              </div>
            ) : price === "free" ? (
              <p>{`${price}`}</p>
            ) : (
              <p>{`$${price}`}</p>
            )}
          </div>
          <div className={styles.addShoppingCart}>
            <div className={styles.containerButton}>
              {state ? (
                <>
                  <button
                    className={changeClass.classButton}
                    type="button"
                    onClick={addingToShoppingCart}
                  >
                    Add To Cart
                  </button>
                  {isAuthenticated === true && (
                    <button
                      className={changeClass.classButton}
                      onClick={addingToWishList}
                    >
                      Add Favourite
                    </button>
                  )}
                </>
              ) : (
                <p>Not avivable Game</p>
              )}
            </div>
            <p className={styles.msg}>{successMsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};
