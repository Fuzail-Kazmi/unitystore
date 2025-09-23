"use client"
import { MapPin } from 'lucide-react';
import React, { useState } from 'react'


interface Address {
    type: 'home' | 'work';
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

const addresses: Address[] = [
    {
        type: 'home',
        street: '1234 Oak Street, Apt 5B',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'United States'
    },
    {
        type: 'work',
        street: '567 Business Ave, Suite 200',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'United States'
    }
];


const Index = () => {
    const [addAddress, setAddAddress] = useState(false);
    return (
        <div className="p-6 relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                <button onClick={() => setAddAddress(!addAddress)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Add New Address
                </button>
            </div>
            {addAddress && (
                <div className="absolute bg-white w-50 h-50">
                    <p className="text-gray-600">Address form placeholder</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-400" />
                                <span className="font-medium text-gray-900 capitalize">{address.type} Address</span>
                            </div>
                            <button className="text-blue-600 hover:underline text-sm">Edit</button>
                        </div>
                        <div className="text-gray-600 space-y-1">
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.zip}</p>
                            <p>{address.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Index