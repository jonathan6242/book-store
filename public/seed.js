const Stripe = require('stripe')
const books = require('./books')

const stripe = Stripe('sk_test_51NckPADRvKSWj0Yhhiymvkx48pf7gNozmbsf89lyo7HeXaPMb84jHBpPO6ve234mjW6k84bhxPzeK7CKXHzjjSiX005d9E7Chi')

const createBooks = async () => {
  for(const book of books) {
    await stripe.products.create({
      name: book.name,
      description: book.description,
      default_price_data: {
        currency: book.currency,
        unit_amount_decimal: book.price
      },
      images: [book.image],
      metadata: {
        author: book.author,
        rating: book.rating,
        originalPrice: book?.originalPrice
      }
    }, {
      apiKey: 'sk_test_51NckPADRvKSWj0Yhhiymvkx48pf7gNozmbsf89lyo7HeXaPMb84jHBpPO6ve234mjW6k84bhxPzeK7CKXHzjjSiX005d9E7Chi'
    })
  }
}

createBooks()

