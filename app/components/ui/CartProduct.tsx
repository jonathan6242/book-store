import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "use-shopping-cart";

function CartProduct({ product }: { product: any }) {
  const {
    name,
    image,
    formattedValue,
    price,
    quantity,
    id: productId,
  } = product;
  const { setItemQuantity, removeItem } = useShoppingCart();
  
  function removeFromCart(e: any) {
    e.preventDefault();
    const id = toast.loading("Removing item...", {
      position: 'bottom-center'
    })
    removeItem(productId);
    toast.success(`${name} removed`, {
      position: 'bottom-center',
      id
    })
  }

  return (
    <tr className="w-full flex items-center justify-center sm:justify-between font-normal py-8 sm:py-4 text-center sm:text-left">
      {/* Product Column */}
      <td className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 table__product flex-shrink-0">
        <Link
          href={`/books/${productId}`}
          className="w-full max-w-[128px] sm:max-w-[96px] relative shadow flex flex-shrink-0"
        >
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ height: "auto", width: "100%" }}
          />
        </Link>
        <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-1">
          <span className="text-lg font-semibold leading-tight max-w-[200px] line-clamp-2">
            {name}
          </span>
          <div className="flex border divide-x sm:hidden">
            <button
              onClick={() => setItemQuantity(productId, quantity - 1)}
              className="grid place-items-center hover:text-rose-500 hover:bg-rose-500/10 duration-200 w-10"
              disabled={quantity <= 1}
            >
              <MinusSmallIcon className="w-4 h-4 flex-shrink-0" />
            </button>
            <input
              type="text"
              value={quantity}
              onChange={() => {}}
              className="w-10 h-10 text-center focus:outline-none"
              min={1}
            ></input>
            <button
              onClick={() => setItemQuantity(productId, quantity + 1)}
              className="grid place-items-center hover:text-lime-500 hover:bg-lime-500/10 duration-200 w-10"
            >
              <PlusSmallIcon className="w-4 h-4 flex-shrink-0" />
            </button>
          </div>
          <div className="text-lg sm:hidden">
            ${((price * quantity) / 100).toFixed(2)}
          </div>
          <button
            onClick={removeFromCart}
            className="text-lime-500 underline underline-offset-4 text-sm"
          >
            Remove
          </button>
        </div>
      </td>
      {/* Price Column */}
      <td className="table__price text-lg">${(price / 100).toFixed(2)}</td>
      {/* Quantity Column */}
      <td className="table__quantity hidden sm:flex justify-start">
        <div className="flex border divide-x">
          <button
            onClick={() => setItemQuantity(productId, quantity - 1)}
            className="grid place-items-center hover:text-rose-500 hover:bg-rose-500/10 duration-200 w-10"
            disabled={quantity <= 1}
          >
            <MinusSmallIcon className="w-4 h-4 flex-shrink-0" />
          </button>
          <input
            type="text"
            value={quantity}
            onChange={() => {}}
            className="w-10 h-10 text-center focus:outline-none"
            min={1}
          ></input>
          <button
            onClick={() => setItemQuantity(productId, quantity + 1)}
            className="grid place-items-center hover:text-lime-500 hover:bg-lime-500/10 duration-200 w-10"
          >
            <PlusSmallIcon className="w-4 h-4 flex-shrink-0" />
          </button>
        </div>
      </td>
      {/* Subtotal Column */}
      <td className="table__subtotal text-lg hidden sm:block">
        {formattedValue.slice(2)}
      </td>
    </tr>
  );
}
export default CartProduct;
