'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    brand?: string;
    price: string;
    quantity: number;
    thumbnail: string;
    code?: string;
}

interface CartContextType {
    items: CartItem[];
    isOrderSheetOpen: boolean;
    addToCart: (item: CartItem) => void;
    addItemsToCart: (newItems: CartItem[]) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    openOrderSheet: () => void;
    closeOrderSheet: () => void;
    toggleOrderSheet: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOrderSheetOpen, setIsOrderSheetOpen] = useState(false);

    const addToCart = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
        // Open order sheet when item is added
        setIsOrderSheetOpen(true);
    };

    const addItemsToCart = (newItems: CartItem[]) => {
        setItems((prevItems) => {
            let updatedItems = [...prevItems];
            newItems.forEach((newItem) => {
                const existingItem = updatedItems.find((item) => item.id === newItem.id);
                if (existingItem) {
                    updatedItems = updatedItems.map((item) =>
                        item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
                    );
                } else {
                    updatedItems.push(newItem);
                }
            });
            return updatedItems;
        });
        setIsOrderSheetOpen(true);
    };

    const removeFromCart = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const openOrderSheet = () => setIsOrderSheetOpen(true);
    const closeOrderSheet = () => setIsOrderSheetOpen(false);
    const toggleOrderSheet = () => setIsOrderSheetOpen((prev) => !prev);
    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider
            value={{
                items,
                isOrderSheetOpen,
                addToCart,
                addItemsToCart,
                removeFromCart,
                updateQuantity,
                openOrderSheet,
                closeOrderSheet,
                toggleOrderSheet,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
