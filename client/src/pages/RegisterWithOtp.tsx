import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RegisterWithOtp() {
    return (
        <Card className="w-full max-w-md mx-auto mt-20">
            <CardHeader>
                <h2 className="text-xl font-semibold text-center">
                    Register to GymBuddy
                </h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input type="email" placeholder="Email" />

                <Button className="w-full" type="submit">
                    Submit
                </Button>
            </CardContent>
        </Card>
    );
}
