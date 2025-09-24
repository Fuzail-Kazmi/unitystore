// "use client";
// import { MapPin } from "lucide-react";
// import React from "react";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; 

// interface Address {
//   type: "home" | "work";
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
//   country: string;
// }

// const addresses: Address[] = [
//   {
//     type: "home",
//     street: "1234 Oak Street, Apt 5B",
//     city: "San Francisco",
//     state: "CA",    
//     zip: "94102",
//     country: "United States",
//   },
//   {
//     type: "work",
//     street: "567 Business Ave, Suite 200",
//     city: "San Francisco",
//     state: "CA",
//     zip: "94105",
//     country: "United States",
//   },
// ];

// const Index = () => {
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget as HTMLFormElement);
//     const newAddress: Address = {
//       type: (formData.get("type") as "home" | "work") || "home",
//       street: formData.get("street") as string,
//       city: formData.get("city") as string,
//       state: formData.get("state") as string,
//       zip: formData.get("zip") as string,
//       country: formData.get("country") as string,
//     };
//     console.log("New Address:", newAddress);
//   };

//   return (
//     <div className="p-6 relative">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">
//           Saved Addresses
//         </h2>

//         <Popover>
//           <PopoverTrigger asChild>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
//               Add New Address
//             </button>
//           </PopoverTrigger>
//           <PopoverContent className="w-80 bg-white p-4 rounded-lg shadow-lg">
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Type
//                 </label>
//                 <select
//                   name="type"
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 >
//                   <option value="home">Home</option>
//                   <option value="work">Work</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Street
//                 </label>
//                 <input
//                   name="street"
//                   type="text"
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   City
//                 </label>
//                 <input
//                   name="city"
//                   type="text"
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     State
//                   </label>
//                   <input
//                     name="state"
//                     type="text"
//                     className="w-full border rounded px-2 py-1 text-sm"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     ZIP
//                   </label>
//                   <input
//                     name="zip"
//                     type="text"
//                     className="w-full border rounded px-2 py-1 text-sm"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Country
//                 </label>
//                 <input
//                   name="country"
//                   type="text"
//                   className="w-full border rounded px-2 py-1 text-sm"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
//               >
//                 Save Address
//               </button>
//             </form>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {addresses.map((address, index) => (
//           <div
//             key={index}
//             className="border border-gray-200 rounded-lg p-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-5 w-5 text-gray-400" />
//                 <span className="font-medium text-gray-900 capitalize">
//                   {address.type} Address
//                 </span>
//               </div>
//               <button className="text-blue-600 hover:underline text-sm">
//                 Edit
//               </button>
//             </div>
//             <div className="text-gray-600 space-y-1">
//               <p>{address.street}</p>
//               <p>
//                 {address.city}, {address.state} {address.zip}
//               </p>
//               <p>{address.country}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Index;


// "use client";
// import { MapPin, Plus, Edit3 } from "lucide-react";
// import React, { useState } from "react";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { useAddresses, useCreateAddress, useUpdateAddress } from "@/api/address";

// const Index = () => {
//   const { data: addresses = [] } = useAddresses();
//   const createAddress = useCreateAddress();
//   const updateAddress = useUpdateAddress();

//   const [editingAddress, setEditingAddress] = useState<any | null>(null);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     address_line_1: "",
//     address_line_2: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//     phone_number: "",
//     email: "",
//     address_type: "Home",
//     default: false,
//   });

//   // Handle input change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormValues({ ...formValues, [name]: type === "checkbox" ? checked : value });
//   };

//   // Handle form submit (Add / Update)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingAddress) {
//       updateAddress.mutate({ id: editingAddress.id, ...formValues });
//     } else {
//       createAddress.mutate(formValues);
//     } 
//     setEditingAddress(null);
//     setFormValues({
//       title: "",
//       address_line_1: "",
//       address_line_2: "",
//       city: "",
//       state: "",
//       postal_code: "",
//       country: "",
//       phone_number: "",
//       email: "",
//       address_type: "Home",
//       default: false,
//     });
//   };

//   // Load data into form when editing
//   const handleEdit = (address: any) => {
//     setEditingAddress(address);
//     setFormValues(address);
//   };

//   return (
//     <div className="p-6 relative">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>

//         <Popover>
//           <PopoverTrigger asChild>
//             <button
//               onClick={() => {
//                 setEditingAddress(null);
//                 setFormValues({
//                   title: "",
//                   address_line_1: "",
//                   address_line_2: "",
//                   city: "",
//                   state: "",
//                   postal_code: "",
//                   country: "",
//                   phone_number: "",
//                   email: "",
//                   address_type: "Home",
//                   default: false,
//                 });
//               }}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
//             >
//               <Plus className="h-4 w-4" /> Add Address
//             </button>
//           </PopoverTrigger>

//           {/* Address Form */}
//           <PopoverContent className="w-[500px] bg-white p-5 rounded-xl shadow-xl">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//                 <input
//                   name="title"
//                   value={formValues.title}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Home Address"
//                   className="w-full border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>

//               {/* Address Line 1 */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
//                 <input
//                   name="address_line_1"
//                   value={formValues.address_line_1}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Street, Apartment, etc."
//                   className="w-full border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>

//               {/* Address Line 2 */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
//                 <input
//                   name="address_line_2"
//                   value={formValues.address_line_2 || ""}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Optional"
//                   className="w-full border rounded-lg px-3 py-2 text-sm"
//                 />
//               </div>

//               {/* City & State */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                   <input
//                     name="city"
//                     value={formValues.city}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Karachi"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                   <input
//                     name="state"
//                     value={formValues.state}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Sindh"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Postal Code & Country */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
//                   <input
//                     name="postal_code"
//                     value={formValues.postal_code}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="12345"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                   <input
//                     name="country"
//                     value={formValues.country}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="Pakistan"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Phone & Email */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//                   <input
//                     name="phone_number"
//                     value={formValues.phone_number}
//                     onChange={handleChange}
//                     type="text"
//                     placeholder="123456789"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                   <input
//                     name="email"
//                     value={formValues.email}
//                     onChange={handleChange}
//                     type="email"
//                     placeholder="you@example.com"
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Address Type + Default */}
//               <div className="flex items-center gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
//                   <select
//                     name="address_type"
//                     value={formValues.address_type}
//                     onChange={handleChange}
//                     className="border rounded-lg px-3 py-2 text-sm"
//                   >
//                     <option value="Home">Home</option>
//                     <option value="Work">Work</option>
//                   </select>
//                 </div>
//                 <div className="flex items-center mt-6">
//                   <input
//                     type="checkbox"
//                     name="default"
//                     checked={formValues.default}
//                     onChange={handleChange}
//                     className="mr-2"
//                   />
//                   <span className="text-sm text-gray-700">Set as Default</span>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
//               >
//                 {editingAddress ? "Update Address" : "Save Address"}
//               </button>
//             </form>
//           </PopoverContent>
//         </Popover>
//       </div>

//       {/* Address List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {addresses.map((address: any) => (
//           <div key={address.id} className="border border-gray-200 rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-5 w-5 text-gray-400" />
//                 <span className="font-medium text-gray-900">{address.title}</span>
//               </div>
//               <button
//                 onClick={() => handleEdit(address)}
//                 className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
//               >
//                 <Edit3 className="h-4 w-4" /> Edit
//               </button>
//             </div>
//             <div className="text-gray-600 space-y-1 text-sm">
//               <p>{address.address_line_1}</p>
//               {address.address_line_2 && <p>{address.address_line_2}</p>}
//               <p>
//                 {address.city}, {address.state} {address.postal_code}
//               </p>
//               <p>{address.country}</p>
//               <p>{address.phone_number}</p>
//               <p>{address.email}</p>
//               {address.default && <span className="text-xs text-green-600">Default</span>}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Index;

// "use client";
// import { MapPin, Plus, Pencil } from "lucide-react";
// import React, { useState } from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { useAddresses, useCreateAddress, useUpdateAddress } from "@/api/address";

// const Index = () => {
//   const { data: addresses = [] } = useAddresses();
//   const createAddress = useCreateAddress();
//   const updateAddress = useUpdateAddress();

//   const [editingAddress, setEditingAddress] = useState<any | null>(null);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     address_type: "Home",
//     address_line_1: "",
//     address_line_2: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     country: "",
//     phone_number: "",
//     email: "",
//     default: false,
//   });

//   const resetForm = () => {
//     setFormValues({
//       title: "",
//       address_type: "Home",
//       address_line_1: "",
//       address_line_2: "",
//       city: "",
//       state: "",
//       postal_code: "",
//       country: "",
//       phone_number: "",
//       email: "",
//       default: false,
//     });
//     setEditingAddress(null);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6 relative">
//         <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
//         <div>
//           <AddAddressForm />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {addresses.map((address: any) => (
//           <div
//             key={address.id}
//             className="border border-gray-200 rounded-lg p-6"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <MapPin className="h-5 w-5 text-gray-400" />
//                 <span className="font-medium text-gray-900 capitalize">
//                   {address.title}
//                 </span>
//               </div>
//               <button
//                 className="text-blue-600 hover:underline text-sm flex items-center gap-1"
//                 onClick={() => {
//                   setEditingAddress(address);
//                   setFormValues(address);
//                 }}
//               >
//                 <Pencil className="h-4 w-4" /> Edit
//               </button>
//             </div>
//             <div className="text-gray-600 space-y-1 text-sm">
//               <p>{address.address_line_1}</p>
//               {address.address_line_2 && <p>{address.address_line_2}</p>}
//               <p>
//                 {address.city}, {address.state} {address.postal_code}
//               </p>
//               <p>{address.country}</p>
//               <p>{address.phone_number}</p>
//               <p>{address.email}</p>
//               {address.default && (
//                 <span className="text-xs text-green-600">Default</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Index;


"use client";
import { MapPin, Pencil } from "lucide-react";
import React, { useState } from "react";
import { useAddresses } from "@/api/address";
import AddAddressForm from "./add-address-form";

const Index = () => {
  const { data: addresses = [] } = useAddresses();

  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [formValues, setFormValues] = useState({});

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 relative">
        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
        <AddAddressForm
          editingAddress={editingAddress}
          setEditingAddress={setEditingAddress}
          setFormValues={setFormValues}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address: any) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900 capitalize">
                  {address.title}
                </span>
              </div>
              <button
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                onClick={() => {
                  setEditingAddress(address);
                  setFormValues(address);
                }}
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
            </div>
            <div className="text-gray-600 space-y-1 text-sm">
              <p>{address.address_line_1}</p>
              {address.address_line_2 && <p>{address.address_line_2}</p>}
              <p>
                {address.city}, {address.state} {address.postal_code}
              </p>
              <p>{address.country}</p>
              <p>{address.phone_number}</p>
              <p>{address.email}</p>
              {address.default && (
                <span className="text-xs text-green-600">Default</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;



