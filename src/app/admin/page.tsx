"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { GiftItem } from "@/types";

// Mock data for demonstration
const mockItems: GiftItem[] = [
  {
    id: "1",
    name: "Red Roses Bouquet",
    category: "Flowers",
    price: 519.47,
    imageUrl: "/api/placeholder/150/150",
    description: "Beautiful red roses with elegant wrapping",
  },
  {
    id: "2",
    name: "Premium Chocolates",
    category: "Chocolates",
    price: 277.21,
    imageUrl: "/api/placeholder/150/150",
    description: "Artisan chocolate collection",
  },
  {
    id: "3",
    name: "Handwritten Card",
    category: "Cards",
    price: 86.48,
    imageUrl: "/api/placeholder/150/150",
    description: "Customizable greeting card",
  },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("items");
  const [items, setItems] = useState<GiftItem[]>(mockItems);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<GiftItem | null>(null);

  // Check if user is admin (in production, this would come from user metadata)
  const isAdmin = user?.email?.includes("admin") || true; // Demo: allow all users for testing

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Please sign in to access the admin dashboard.
            </p>
            <Button onClick={() => (window.location.href = "/auth/signin")}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              You don't have permission to access this page.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEditItem = (item: GiftItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== itemId));
    }
  };

  const handleSaveItem = (item: GiftItem) => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } else {
      const newItem = { ...item, id: Date.now().toString() };
      setItems([...items, newItem]);
    }
    setIsEditing(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage your gift items, categories, and orders
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          {["items", "categories", "orders"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Items Tab */}
          {activeTab === "items" && (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Gift Items Management</CardTitle>
                <Button
                  onClick={() => {
                    setEditingItem({
                      id: "",
                      name: "",
                      category: "",
                      price: 0,
                      imageUrl: "",
                      description: "",
                    } as GiftItem);
                    setIsEditing(true);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                {isEditing && editingItem ? (
                  <ItemForm
                    item={editingItem}
                    onSave={handleSaveItem}
                    onCancel={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                    }}
                  />
                ) : (
                  <ItemsList
                    items={items}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Categories Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Flowers",
                    "Chocolates",
                    "Cards",
                    "Toys",
                    "Books",
                    "Jewelry",
                  ].map((category) => (
                    <div
                      key={category}
                      className="p-4 bg-white/50 rounded-lg border"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category}</span>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock orders */}
                  {[1, 2, 3].map((order) => (
                    <div
                      key={order}
                      className="p-4 bg-white/50 rounded-lg border"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Order #{order}001</h4>
                          <p className="text-sm text-gray-600">
                            Customer: john@example.com
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: R{(Math.random() * 100 + 50).toFixed(2)}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="default">
                            Update Status
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Items List Component
function ItemsList({
  items,
  onEdit,
  onDelete,
}: {
  items: GiftItem[];
  onEdit: (item: GiftItem) => void;
  onDelete: (itemId: string) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-white/50 rounded-lg border">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <h3 className="font-medium mb-1">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-pink-600">R{item.price}</span>
            <span className="text-xs text-gray-500">{item.category}</span>
          </div>
          <div className="flex space-x-2 mt-3">
            <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Item Form Component
function ItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: GiftItem;
  onSave: (item: GiftItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<GiftItem>(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Flowers">Flowers</option>
            <option value="Chocolates">Chocolates</option>
            <option value="Cards">Cards</option>
            <option value="Toys">Toys</option>
            <option value="Books">Books</option>
            <option value="Jewelry">Jewelry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={3}
          required
        />
      </div>

      <div className="flex space-x-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-600"
        >
          Save Item
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
