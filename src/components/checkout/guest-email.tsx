import React from 'react';
import { guestEmailAtom } from '@/store/checkout';
import { useAtom } from 'jotai';
import Input from '@/components/ui/forms/input';
function GuestEmail({ count, label }: { count: number; label: string }) {
    const [email, setEmail] = useAtom(guestEmailAtom);
    return (
        <div className="p-5 bg-light shadow-700 md:p-8">
            <div className="flex items-center justify-between mb-5 md:mb-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
                    <span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent text-light lg:text-xl">
                        {count}
                    </span>
                    <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
                </div>
            </div>
            <div className="block">
                <Input
                    //@ts-ignore
                    value={email}
                    name="guestEmail"
                    onChange={(e) => (setEmail(e.target.value))}
                    variant="outline"
                />
            </div>
        </div>
    );
}
export default GuestEmail;