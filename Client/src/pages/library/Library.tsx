import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import { getProductsOfLibraryById } from "../../Controller/LibraryController";
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import styles from "./Library.module.scss";
import CardLibrary from "../../components/LibraryCard/LibraryCard";
import { ProductsType } from "../../types";

const Library = () => {
  const { user } = useAuth0();
  const [products, setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    if (user?.email) {
      getProductsOfLibraryById(String(user.email)).then((products) =>
        setProducts(products)
      );
    }
  }, []);

  return (
    <div className={styles.fullContainer}>
      {window.innerWidth > 959 ? <NavBar /> : <NavbarPhone />}
      {products.length ? (
        <section className={styles.container}>
          {products.map((product: ProductsType) => {
            return (
              <CardLibrary
                key={product.id}
                id={product.ProductId}
                name={product.Product.name}
                background_image={product.Product.background_image}
                price={product.Product.price}
                released={product.Product.released}
              />
            );
          })}
        </section>
      ) : (
        <p>"Not found Games "</p>
      )}
    </div>
  );
};
export default Library;
