import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Tabs,
  Input as AntInput,
} from "antd";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
const { TabPane } = Tabs;
const { Search } = AntInput;

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [variantModal, setVariantModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [form] = Form.useForm();
  const [variantForm] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [variantSearch, setVariantSearch] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchVariants();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filter products based on search
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(productSearch.toLowerCase())
      )
    );
  }, [productSearch, products]);

  useEffect(() => {
    // Filter variants based on search
    setFilteredVariants(
      variants.filter((variant) =>
        variant.configLabel.toLowerCase().includes(variantSearch.toLowerCase())
      )
    );
  }, [variantSearch, variants]);

  const fetchProducts = async () => {
    const res = await productApi.getAll();
    setProducts(res);
    setFilteredProducts(res);
  };

  const fetchCategories = async () => {
    const res = await categoryApi.getAll();
    setCategories(res || []);
  };

  const fetchVariants = async () => {
    const res = await productApi.getAllVariants();
    setVariants(res);
    setFilteredVariants(res);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setProductModal(true);
  };

  const handleEditProduct = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    await productApi.deleteProduct(id);
    message.success("Deleted!");
    fetchProducts();
    fetchVariants();
  };

  const handleProductSubmit = async (values) => {
    if (editingProduct) {
      await productApi.updateProduct(editingProduct.id, values);
      message.success("Updated!");
    } else {
      await productApi.createProduct(values);
      message.success("Created!");
    }
    setProductModal(false);
    fetchProducts();
  };

  const handleAddVariant = () => {
    setEditingVariant(null);
    variantForm.resetFields();
    setVariantModal(true);
  };

  const handleEditVariant = (record) => {
    setEditingVariant(record);
    variantForm.setFieldsValue(record);
    setVariantModal(true);
  };

  const handleDeleteVariant = async (id) => {
    await productApi.deleteVariant(id);
    message.success("Deleted!");
    fetchVariants();
  };

  const handleVariantSubmit = async (values) => {
    if (editingVariant) {
      await productApi.updateVariant(editingVariant.id, values);
      message.success("Updated!");
    } else {
      await productApi.createVariant(values);
      message.success("Created!");
    }
    setVariantModal(false);
    fetchVariants();
  };

  const handleProductSearch = (value) => {
    setProductSearch(value);
  };

  const handleVariantSearch = (value) => {
    setVariantSearch(value);
  };

  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "CategoryId",
      dataIndex: "categoryId",
      sorter: (a, b) => a.categoryId - b.categoryId,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDeleteProduct(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const variantColumns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "ProductId",
      dataIndex: "productId",
      sorter: (a, b) => a.productId - b.productId,
    },
    {
      title: "ConfigLabel",
      dataIndex: "configLabel",
      sorter: (a, b) => a.configLabel.localeCompare(b.configLabel),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEditVariant(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDeleteVariant(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Products" key="1">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Product List</h2>
            <div className="flex gap-4">
              <Search
                placeholder="Search by product name"
                onSearch={handleProductSearch}
                onChange={(e) => handleProductSearch(e.target.value)}
                style={{ width: 200 }}
              />
              <Button type="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
            </div>
          </div>
          <Table
            columns={productColumns}
            dataSource={filteredProducts}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="bg-white"
          />
        </TabPane>
        <TabPane tab="Product Variants" key="2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Product Variant List</h2>
            <div className="flex gap-4">
              <Search
                placeholder="Search by variant config label"
                onSearch={handleVariantSearch}
                onChange={(e) => handleVariantSearch(e.target.value)}
                style={{ width: 200 }}
              />
              <Button type="primary" onClick={handleAddVariant}>
                Add Variant
              </Button>
            </div>
          </div>
          <Table
            columns={variantColumns}
            dataSource={filteredVariants}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="bg-white"
          />
        </TabPane>
      </Tabs>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={productModal}
        onCancel={() => setProductModal(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={handleProductSubmit}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a category">
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingVariant ? "Edit Variant" : "Add Variant"}
        open={variantModal}
        onCancel={() => setVariantModal(false)}
        onOk={() => variantForm.submit()}
        okText="Save"
      >
        <Form
          form={variantForm}
          layout="vertical"
          onFinish={handleVariantSubmit}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="productId"
            label="ProductId"
            rules={[{ required: true }]}
          >
            <Select>
              {products.map((p) => (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="configLabel"
            label="Config Label"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagementPage;
