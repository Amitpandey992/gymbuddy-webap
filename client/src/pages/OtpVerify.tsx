import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OtpVerify() {
    return (
        <div className="max-w-sm mx-auto mt-20 space-y-4">
            <h2 className="text-xl font-medium text-center">Enter OTP</h2>
            <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                    <Input key={i} maxLength={1} className="text-center" />
                ))}
            </div>
            <Button className="w-full">Verify OTP</Button>
        </div>
    );
}
