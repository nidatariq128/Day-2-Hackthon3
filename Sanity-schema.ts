// PRODUCT SCHEMA
const Product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule) => Rule.required().max(100).warning("Keep the name short!"),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (Rule) => Rule.required().min(20).max(500),
      },
      {
        name: "rating",
        title: "Rating",
        type: "number",
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .max(5)
            .warning("Rating must be between 0 and 5."),
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule) => Rule.required().min(0).warning("Price cannot be negative."),
      },
      {
        name: "discountedPrice",
        title: "Discounted Price",
        type: "number",
        validation: (Rule) =>
          Rule.min(0)
            .custom((discountedPrice, context) =>
              discountedPrice > context.document.price
                ? "Discounted price cannot be greater than the original price."
                : true
            ),
      },
      {
        name: "stockQuantity",
        title: "Stock Quantity",
        type: "number",
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .warning("Stock quantity cannot be negative."),
      },
      {
        name: "brand",
        title: "Brand",
        type: "string",
        validation: (Rule) => Rule.required().max(50).warning("Brand name should be short."),
      },
      {
        name: "dimensions",
        title: "Dimensions / Size",
        type: "object",
        fields: [
          {
            name: "width",
            title: "Width",
            type: "number",
            validation: (Rule) => Rule.min(0).warning("Width cannot be negative."),
          },
          {
            name: "height",
            title: "Height",
            type: "number",
            validation: (Rule) => Rule.min(0).warning("Height cannot be negative."),
          },
          {
            name: "depth",
            title: "Depth",
            type: "number",
            validation: (Rule) => Rule.min(0).warning("Depth cannot be negative."),
          },
        ],
        options: { collapsible: true },
      },
      {
        name: "colors",
        title: "Colors",
        type: "array",
        of: [{ type: "string" }],
        options: {
          layout: "tags",
        },
      },
      {
        name: "categories",
        title: "Categories",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "category" }],
          },
        ],
      },
      {
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
        options: {
          layout: "tags",
        },
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: "alt",
            title: "Alt Text",
            type: "string",
            validation: (Rule) => Rule.required().warning("Alt text is important for accessibility."),
          },
        ],
      },
    ],
  };

// ORDER SCHEMA

  const Order = {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customerId",
        title: "Customer ID",
        type: "reference",
        to: [{ type: "customer" }], // Ensure you have a `customer` schema defined
        validation: (Rule) => Rule.required().error("Customer ID is required."),
      },
      {
        name: "customerName",
        title: "Customer Name",
        type: "string",
        validation: (Rule) =>
          Rule.required()
            .min(2)
            .max(100)
            .warning("Name should be between 2 to 100 characters."),
      },
      {
        name: "customerEmail",
        title: "Customer Email",
        type: "string",
        validation: (Rule) =>
          Rule.required().email().error("Must be a valid email address."),
      },
      {
        name: "items",
        title: "Ordered Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              {
                name: "productId",
                title: "Product ID",
                type: "reference",
                to: [{ type: "product" }], // Ensure you have a `product` schema defined
                validation: (Rule) =>
                  Rule.required().error("Each item must include a product."),
              },
              {
                name: "quantity",
                title: "Quantity",
                type: "number",
                validation: (Rule) =>
                  Rule.required()
                    .min(1)
                    .error("Quantity must be at least 1."),
              },
            ],
          },
        ],
        validation: (Rule) =>
          Rule.required().min(1).error("Order must include at least one item."),
      },
      {
        name: "totalPrice",
        title: "Total Price",
        type: "number",
        validation: (Rule) =>
          Rule.required()
            .min(0)
            .error("Total price must be a positive value."),
      },
      {
        name: "orderStatus",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "Pending" },
            { title: "Processing", value: "Processing" },
            { title: "Shipped", value: "Shipped" },
            { title: "Delivered", value: "Delivered" },
            { title: "Cancelled", value: "Cancelled" },
          ],
          layout: "dropdown",
        },
        initialValue: "Pending",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "paymentStatus",
        title: "Payment Status",
        type: "string",
        options: {
          list: [
            { title: "Unpaid", value: "Unpaid" },
            { title: "Paid", value: "Paid" },
            { title: "Refunded", value: "Refunded" },
          ],
          layout: "dropdown",
        },
        initialValue: "Unpaid",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "deliveryAddress",
        title: "Delivery Address",
        type: "object",
        fields: [
          {
            name: "street",
            title: "Street",
            type: "string",
            validation: (Rule) => Rule.required().error("Street address is required."),
          },
          {
            name: "city",
            title: "City",
            type: "string",
            validation: (Rule) => Rule.required().error("City is required."),
          },
          {
            name: "state",
            title: "State",
            type: "string",
            validation: (Rule) => Rule.required().error("State is required."),
          },
          {
            name: "postalCode",
            title: "Postal Code",
            type: "string",
            validation: (Rule) =>
              Rule.required().error("Postal code is required."),
          },
          {
            name: "country",
            title: "Country",
            type: "string",
            validation: (Rule) => Rule.required().error("Country is required."),
          },
        ],
      },
      {
        name: "timestamp",
        title: "Order Timestamp",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          calendarTodayLabel: "Today",
        },
        initialValue: () => new Date().toISOString(),
        validation: (Rule) => Rule.required(),
      },
    ],
  };

// SHIPMENT SCHEMA

export default {
    name: "shipment",
    title: "Shipment",
    type: "document",
    fields: [
      {
        name: "trackingNumber",
        title: "Tracking Number",
        type: "string",
        validation: (Rule) =>
          Rule.required()
            .min(5)
            .max(50)
            .warning("Tracking number should be between 5 to 50 characters."),
      },
      {
        name: "order",
        title: "Associated Order",
        type: "reference",
        to: [{ type: "order" }], // Link to the `order` schema
        validation: (Rule) => Rule.required().error("A shipment must be associated with an order."),
      },
      {
        name: "carrier",
        title: "Carrier",
        type: "string",
        options: {
          list: [
            { title: "FedEx", value: "FedEx" },
            { title: "UPS", value: "UPS" },
            { title: "DHL", value: "DHL" },
            { title: "USPS", value: "USPS" },
          ],
          layout: "dropdown",
        },
        validation: (Rule) => Rule.required().error("Carrier is required."),
      },
      {
        name: "status",
        title: "Shipment Status",
        type: "string",
        options: {
          list: [
            { title: "In Transit", value: "In Transit" },
            { title: "Out for Delivery", value: "Out for Delivery" },
            { title: "Delivered", value: "Delivered" },
            { title: "Pending", value: "Pending" },
          ],
          layout: "dropdown",
        },
        initialValue: "Pending",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "estimatedDeliveryDate",
        title: "Estimated Delivery Date",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          calendarTodayLabel: "Today",
        },
        validation: (Rule) => Rule.required().error("Estimated delivery date is required."),
      },
      {
        name: "actualDeliveryDate",
        title: "Actual Delivery Date",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          calendarTodayLabel: "Today",
        },
      },
      {
        name: "shipmentNotes",
        title: "Shipment Notes",
        type: "text",
        description: "Optional notes about the shipment.",
      },
    ],
  };
  
  