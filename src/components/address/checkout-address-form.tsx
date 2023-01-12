import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { useModalState } from '@/components/ui/modal/modal.context';
import { useUpdateUser } from '@/framework/user';

import { billingAddressAtom, billingshippingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import { useAtom } from 'jotai';

type FormValues = {
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const addressSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf([AddressType.Billing, AddressType.Shipping])
    .required('error-type-required'),
  title: yup.string().required('error-title-required'),
  address: yup.object().shape({
    country: yup.string().required('error-country-required'),
    city: yup.string().required('error-city-required'),
    state: yup.string().required('error-state-required'),
    zip: yup.string().required('error-zip-required'),
    street_address: yup.string().required('error-street-required'),
  }),
});

export const CheckoutAddressForm: React.FC<any> = () => {

  const [billing_shipping_address, setBillingShippingAddress] = useAtom(billingshippingAddressAtom);
  const { t } = useTranslation('common');

  return (
    <div
      className="grid h-full grid-cols-2 gap-5"
    >
      <TextArea
        value = {billing_shipping_address?.street_address}
        onChange= {(e)=> setBillingShippingAddress({...billing_shipping_address, street_address:e.target.value})}
        name="address"
        label={t('text-street-address')}
        variant="outline"
        className="col-span-2"
      />
      <Input
        // label={t('text-zip')}
        value = {billing_shipping_address?.zip}
        onChange= {(e)=> setBillingShippingAddress({...billing_shipping_address, zip:e.target.value})}
        name="pincode"
        label="Pin Code"
        variant="outline"
        className="col-span-2"
      />
      <Input
        value = {billing_shipping_address?.city}
        onChange= {(e)=> setBillingShippingAddress({...billing_shipping_address, city:e.target.value})}
        name="city"
        label={t('text-city')}
        variant="outline"
        className="col-span-2"
      />
      <Input
        value = {billing_shipping_address?.state}
        onChange= {(e)=> setBillingShippingAddress({...billing_shipping_address, state:e.target.value})}
        name="state"
        label={t('text-state')}
        variant="outline"
        className="col-span-2"
      />
    </div>
  );
};

export default function CreateOrUpdateCheckoutAddressForm() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-light md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-center text-lg font-semibold text-heading sm:mb-6">
        {/* {address ? t('text-update') : t('text-add-new')} {t('text-address')} */}
      </h1>
      <CheckoutAddressForm/>
    </div>
  );
}
