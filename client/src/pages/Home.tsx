import { useEffect, useState } from "react";
// import {
//   Card,
//   // CardContent,
//   // CardDescription,
//   // CardFooter,
//   // CardHeader,
//   // CardTitle,
// } from "@/components/ui/card";
import Card from "@/components/Card";
import { useAppContext } from "@/contexts/AppContext";

interface UserDetail {
    _id: string;
    name: string;
    email: string;
    // Add more fields as needed
}

const Main = () => {
    const { fetchAllUsers } = useAppContext();
    const [usersDetail, setUsersDetail] = useState<UserDetail[]>([]);
    const [likedStates, setLikedStates] = useState<Record<string, boolean>>({});

    const handleLikeButtonClick = (userId: string) => {
        setLikedStates((prevStates) => ({
            ...prevStates,
            [userId]: !prevStates[userId],
        }));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetchAllUsers();
                setUsersDetail(res.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [fetchAllUsers]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-900 min-h-screen">
            {usersDetail?.map((userDetail) => (
                <Card
                    key={userDetail._id}
                    userDetail={userDetail}
                    likedButtonClicked={likedStates[userDetail._id] || false}
                    handleLikeButtonClick={() =>
                        handleLikeButtonClick(userDetail._id)
                    }
                />
            ))}
        </div>
    );
};

export default Main;
