export default function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, address, cart } = req.body;

    if (!firstName || !lastName || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("New Order:", { firstName, lastName, address, cart });
    res.status(200).json({ message: "Order placed successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
