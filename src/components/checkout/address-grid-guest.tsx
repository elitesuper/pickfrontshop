import type { Address } from '@/types';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { RadioGroup } from '@headlessui/react';
import { useAtom, WritableAtom } from 'jotai';
import AddressCard from '@/components/address/address-card';
import { AddressHeader } from '@/components/address/address-header';
import { useTranslation } from 'next-i18next';
import { CheckoutAddressForm } from '../address/checkout-address-form';
import { CheckoutAddressHeader } from '../address/checkout-address-header';

interface AddressesProps {
  addresses: Address[] | undefined;
  label: string;
  atom: WritableAtom<Address | null, Address>;
  className?: string;
  count: number;
  type: string;
}

export const GuestAddressGrid: React.FC<AddressesProps> = ({
  addresses,
  label,
  atom,
  className,
  count,
  type,
}) => {
  const { t } = useTranslation('common');


  return (
    <div className={className}>
      <CheckoutAddressHeader count={count} label={label}/>
      <CheckoutAddressForm></CheckoutAddressForm>
    </div>
  );
};
export default GuestAddressGrid;
