"use client";
import React, { useState } from "react";
import { ChevronLeft, Save, Upload } from "lucide-react";
import { useCreateProduct, useUpdateProduct } from "@/api/product";
import { useCategories } from "@/api/category";
import { useBrandsList } from "@/api/brand";

interface ProductFormProps {
  product?: any;
  mode?: "add" | "edit";
  setCurrentView: (view: string) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  mode = "add",
  setCurrentView,
}) => {
  const [formData, setFormData] = useState({
    product_name: product?.product_name || "",
    description: product?.description || "",
    price: product?.price || "",
    discount_price: product?.discount_price || "",
    category: product?.category?.id || "",
    brand: product?.brand?.id || "",
    cover_image: null as File | null,
    all_images: [] as File[],
  });

  const [errors, setErrors] = useState<any>({});

  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrandsList();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cover_image: file }));
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const validateForm = () => {
    const errs: any = {};
    if (!formData.product_name.trim())
      errs.product_name = "Product name is required";
    if (!formData.price) errs.price = "Price is required";
    if (formData.price && isNaN(Number(formData.price)))
      errs.price = "Price must be a number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const fd = new FormData();
    fd.append("product_name", formData.product_name);
    fd.append("description", formData.description);
    fd.append("price", formData.price.toString());
    fd.append("discount_price", formData.discount_price.toString());
    if (formData.category) fd.append("category", formData.category);
    if (formData.brand) fd.append("brand", formData.brand);
    if (formData.cover_image) fd.append("cover_image", formData.cover_image);
    formData.all_images.forEach((img) => fd.append("all_images", img));

    try {
      if (mode === "add") {
        // ✅ createMutation expects payload only
        await createMutation.mutateAsync(fd);
      } else {
        // ✅ updateMutation wants { id, payload }
        await updateMutation.mutateAsync({
          id: product?.id,
          payload: fd,
        });
      }
      setCurrentView("list");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("list")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h1 className="text-lg font-semibold text-gray-700">
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl space-y-6">
        <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Product Name *</label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.product_name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.product_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Brand</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-2">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Images</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2">Cover Image</label>

            {(formData.cover_image
              ? URL.createObjectURL(formData.cover_image)
              : product?.cover_image) && (
                <img
                  src={
                    formData.cover_image
                      ? URL.createObjectURL(formData.cover_image)
                      : product?.cover_image
                  }
                  alt="Cover Preview"
                  className="w-32 h-32 object-cover rounded-lg border mb-3"
                />
              )}

            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm w-fit">
              <Upload className="w-4 h-4" />
              Upload Cover Image
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm mb-2">Product Images</label>

            <div className="flex flex-wrap gap-3 mb-3">
              {!formData.all_images.length &&
                product?.all_images?.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt="Old Img"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}

              {formData.all_images.length > 0 &&
                formData.all_images.map((file: File, index: number) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
            </div>

            <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 text-sm w-fit">
              <Upload className="w-4 h-4" />
              Upload Product Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              setFormData({
                product_name: product?.product_name || "",
                description: product?.description || "",
                price: product?.price || "",
                discount_price: product?.discount_price || "",
                category: product?.category?.id || "",
                brand: product?.brand?.id || "",
                cover_image: null,
                all_images: [],
              });
              setCurrentView("list");
            }}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            {mode === "add" ? "Add Product" : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
