import { getBooks } from "../(utils)/functions";
import Wishlist from "../components/(pages)/Wishlist";

async function WishlistLoader() {
  const books = await getBooks();

  return (
    <Wishlist books={books} />
  )
}

export default WishlistLoader