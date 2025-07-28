import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CompleteProfile() {
    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader>
                <h2 className="text-xl font-semibold text-center">
                    Complete Your Profile
                </h2>
            </CardHeader>
            <CardContent className="space-y-3">
                <Input type="file" />
                <Input placeholder="DOB" type="date" />
                <Input placeholder="Location" />
                <Input placeholder="Phone Number" />
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="Country" />
                <Button className="w-full mt-4">Finish</Button>
            </CardContent>
        </Card>
    );
}
