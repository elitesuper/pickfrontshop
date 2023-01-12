import { formatOrderedProduct } from '@/lib/format-ordered-product';
import { useAtom } from 'jotai';
import { billingAddressAtom, billingshippingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import Button from '@/components/ui/button';
import { useCart } from '@/store/quick-cart/cart.context';
import classNames from 'classnames';
import { useVerifyOrder } from '@/framework/order';
import omit from 'lodash/omit';
import { useEffectOnce } from 'react-use';

export const CheckAvailabilityAction: React.FC<{ className?: string }> = (
  props
) => {
  // const [billing_shipping_address] = useAtom(billingshippingAddressAtom);
  // const [shipping_address] = useAtom(shippingAddressAtom);
  const { items, total, isEmpty } = useCart();

  const { mutate: verifyCheckout, isLoading: loading } : any = useVerifyOrder();

  function handleVerifyCheckout() {
    verifyCheckout({
      amount: total,
      products: items?.map((item) => formatOrderedProduct(item)),
      // billing_shipping_address: {
      //   ...(billing_shipping_address?.street_address &&
      //     omit(billing_address.address, ['__typename'])),
      // }
      // ,
      // shipping_address: {
      //   ...(shipping_address?.address &&
      //     omit(shipping_address.address, ['__typename'])),
      // },
    });
  }

  useEffectOnce(()=>{
    handleVerifyCheckout()
  })
  return (
    <>
      {/* <Button
        loading={loading}
        className={classNames('mt-5 w-full', props.className)}
        onClick={handleVerifyCheckout}
        disabled={isEmpty}
        {...props}
      /> */}
    </>
  );
};
