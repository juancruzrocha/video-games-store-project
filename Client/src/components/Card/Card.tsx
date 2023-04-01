import styles from "./Card.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ADDED_TO_CART } from "../../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addProductToWishList,
  checkIfProductWasPurchased,
} from "../../Controller/cardController";
import { setwishList } from "../../redux/reducer/wishReducer";
import { RootState } from "../../redux/store";
import { CardPropsType } from "../../types";
import { addProductInShoppingCar } from "../../redux/actions/shoppingCartAction";

export const Card = ({
  id,
  name,
  background_image,
  price,
  genres,
  state,
}: CardPropsType) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated }: any = useAuth0();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [changeClass, setChangeClass] = useState({
    classButton: styles.buttonAdd,
    classCard: styles.cardContainer,
  });
  //AramisNote: Este useEffect lo unico que hace las clases de css dinamicas.
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
  const addProductToWishListHanlder = async () => {
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
                    onClick={() =>
                      dispatch(addProductInShoppingCar(user.email, id))
                    }
                  >
                    Add To Cart
                  </button>
                  {isAuthenticated === true && (
                    <button
                      className={changeClass.classButton}
                      onClick={addProductToWishListHanlder}
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
