
import Input from '@/components/ui/forms/input';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';

import { useAtom } from 'jotai';
import { guestBillingAddressAtom } from '@/store/checkout';


export const CheckoutAddressForm: React.FC<any> = () => {

  const [guestbillingaddress, setGuestBillingAddressAtom] = useAtom(guestBillingAddressAtom);
  const { t } = useTranslation('common');

  return (
    <div
      className="grid h-full grid-cols-2 gap-5"
    >
      <TextArea
        value = {guestbillingaddress?.street_address}
        onChange= {(e)=> setGuestBillingAddressAtom({...guestbillingaddress, street_address:e.target.value})}
        name="address"
        label={t('text-street-address')}
        variant="outline"
        className="col-span-2"
      />
      <Input
        // label={t('text-zip')}
        value = {guestbillingaddress?.zip}
        onChange= {(e)=> setGuestBillingAddressAtom({...guestbillingaddress, zip:e.target.value})}
        name="pincode"
        label="Pin Code"
        variant="outline"
        className="col-span-2"
      />
      <Input
        value = {guestbillingaddress?.city}
        onChange= {(e)=> setGuestBillingAddressAtom({...guestbillingaddress, city:e.target.value})}
        name="city"
        label={t('text-city')}
        variant="outline"
        className="col-span-2"
      />
      <Input
        value = {guestbillingaddress?.state}
        onChange= {(e)=> setGuestBillingAddressAtom({...guestbillingaddress, state:e.target.value})}
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
