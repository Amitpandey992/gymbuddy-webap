import React from "react";
import { X, Trash2 } from "lucide-react";

interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

interface CartSidebarProps {
    isVisible: boolean;
    onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isVisible, onClose }) => {
    const cartItems: CartItem[] = [
        {
            id: 1,
            name: "Growers cider",
            description: "Brief description",
            price: 12,
            quantity: 1,
        },
        {
            id: 2,
            name: "Fresh grapes",
            description: "Brief description",
            price: 8,
            quantity: 1,
        },
        {
            id: 3,
            name: "Heinz tomato ketchup",
            description: "Brief description",
            price: 5,
            quantity: 1,
        },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                {/* Header */}
                <div className="flex justify-center items-center p-4 border-b border-gray-200">
                    <button
                        onClick={onClose}
                        className="absolute right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart's Content */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                            Your cart
                        </h4>
                        <span className="bg-gray-800 text-white text-sm px-2 py-1 rounded-full">
                            {cartItems.length}
                        </span>
                    </div>

                    {/* Cart Items */}
                    <ul className="space-y-4 mb-6">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-start border-b border-gray-100 pb-4"
                            >
                                <div className="flex-1">
                                    <h6 className="font-medium text-gray-800 mb-1">
                                        {item.name}
                                    </h6>
                                    <small className="text-gray-500">
                                        {item.description}
                                    </small>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">
                                        ${item.price}
                                    </span>
                                    <button className="text-red-500 hover:text-red-700 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total (USD)</span>
                            <strong className="text-lg">${total}</strong>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full bg-gray-800 text-white py-3 px-4 hover:bg-gray-700 transition-colors">
                        Continue to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
