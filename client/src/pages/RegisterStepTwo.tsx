import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CreateProfile() {
    return (
        <Card className="w-full max-w-md mx-auto mt-20">
            <CardHeader>
                <h2 className="text-xl font-semibold text-center">
                    Create your profile
                </h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Full name" />
                <Input type="password" placeholder="Password" />
                <Button className="w-full">Next</Button>
            </CardContent>
        </Card>
    );
}
