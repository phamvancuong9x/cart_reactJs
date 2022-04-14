const cart = [
  {
    id: 1,
    image: "./image/Vest_263_2-3.jpg",
    name: "ÁO VEST GHI KẺ LH69",
    price: 2950000,
    quantity: 1,
  },
  {
    id: 2,
    image: "./image/Vest_LH67_2-2.jpg",
    name: "ÁO VEST KẺ XANH - 263",
    price: 2900000,
    quantity: 1,
  },
  {
    id: 3,
    image: "./image/Vest_LH69_2-1.jpg",
    name: "	ÁO VEST GHI KẺ LH67-A",
    price: 2850000,
    quantity: 1,
  },
];

const HeaderCart = ({ amount }) => {
  return (
    <div className="header">
      <h2>Giỏ hàng</h2>
      <div className="icon_cart">
        <i className="fas fa-shopping-cart"></i>
        <div className="total-amount">{amount}</div>
      </div>
    </div>
  );
};

const CountAmount = ({
  idProduct,
  quantity,
  handleIncrease,
  handleDecrease,
}) => {
  return (
    <div className="detailProduct__quantity-input">
      <span
        className="icon-minus-modal icon-quantity-modal "
        onClick={() => handleDecrease(idProduct)}
      >
        <i className="fas fa-minus"></i>
      </span>
      <div className="quantity">{quantity}</div>
      <span
        className="icon-plus-modal icon-quantity-modal"
        onClick={() => handleIncrease(idProduct)}
      >
        <i className="fas fa-plus"></i>
      </span>
    </div>
  );
};

const TotalAmount = ({ total }) => {
  return (
    <div className="cart-total">
      <h4>
        Tổng Tiền
        <span className="totalMoney">{total}</span>
      </h4>
    </div>
  );
};

const ProductsItem = ({
  idProduct,
  image,
  name,
  price,
  quantity,
  handleIncrease,
  handleDecrease,
  handleRemove,
}) => {
  return (
    <div className="product_item">
      <div className="product_image">
        <img src={image} alt="product-image" />
      </div>
      <div className="product_info">
        <div className="product_name">{name}</div>
        <div className="product_price">{price}</div>
        <div className="remove_btn" onClick={() => handleRemove(idProduct)}>
          Xoa
        </div>
      </div>
      <CountAmount
        quantity={quantity}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
        idProduct={idProduct}
      />
    </div>
  );
};
const Cart = ({ cart, handleIncrease, handleDecrease, handleRemove }) => {
  return (
    <div className="cart">
      {cart.map((value) => {
        return (
          <ProductsItem
            key={value.id}
            idProduct={value.id}
            name={value.name}
            image={value.image}
            price={value.price}
            quantity={value.quantity}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
            handleRemove={handleRemove}
          />
        );
      })}
    </div>
  );
};

function App() {
  const [cartState, setCartState] = React.useState({
    cart: [],
    total: 0,
    amount: 0,
  });
  React.useEffect(() => {
    let total = cart.reduce((total, current) => {
      total += current.price * current.quantity;
      return total;
    }, 0);
    let amount = cart.reduce((amount, current) => {
      amount += current.quantity;
      console.log(amount);
      return amount;
    }, 0);
    setCartState({
      cart,
      total,
      amount,
    });
  }, []);
  const handleSetState = (cart) => {
    let newTotal = cart.reduce((total, current) => {
      total += current.price * current.quantity;
      return total;
    }, 0);

    let newAmount = cart.reduce((amount, current) => {
      amount += current.quantity;

      return amount;
    }, 0);
    setCartState({
      ...cartState,
      cart: cart,
      amount: newAmount,
      total: newTotal,
    });
  };
  const handleIncrease = (idProduct) => {
    let newCart = cartState.cart.map((value) => {
      if (value.id == idProduct) {
        return { ...value, quantity: value.quantity + 1 };
      }
      return value;
    });

    handleSetState(newCart);
  };
  const handleRemove = (idProduct) => {
    let newCart = cartState.cart.filter((value) => {
      return value.id != idProduct;
    });
    handleSetState(newCart);
  };
  const handleDecrease = (idProduct) => {
    let newCart = cartState.cart.map((value) => {
      if (value.id == idProduct && value.quantity > 1) {
        return { ...value, quantity: value.quantity - 1 };
      }
      return value;
    });
    handleSetState(newCart);
  };
  const handleRemoveAll = () => {
    setCartState({ cart: [], amount: 0, total: 0 });
  };
  return (
    <div className="container">
      <HeaderCart amount={cartState.amount} />
      <h3 className="breadcrumbs__content-title"> GIỎ HÀNG CỦA BẠN</h3>
      <Cart
        cart={cartState.cart}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
        handleRemove={handleRemove}
      />
      {cartState.cart.length == 0 ? (
        <h3>không có sản phẩm !</h3>
      ) : (
        <React.Fragment>
          <TotalAmount total={cartState.total} />
          <div className="btn">
            <button className="btn-clear" onClick={handleRemoveAll}>
              Xóa Tất cả
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
