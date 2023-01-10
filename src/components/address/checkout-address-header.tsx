import { useTranslation } from 'next-i18next';

interface CheckoutAddressHeaderProps {
  count: number | boolean;
  label: string;
}

export const CheckoutAddressHeader: React.FC<CheckoutAddressHeaderProps> = ({
  count,
  label,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex items-center justify-between mb-5 md:mb-8">
      <div className="flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse">
        {count && (
          <span className="rounded-full w-8 h-8 bg-accent flex items-center justify-center text-base lg:text-xl text-light">
            {count}
          </span>
        )}
        <p className="text-lg lg:text-xl text-heading capitalize">{label}</p>
      </div>
    </div>
  );
};
