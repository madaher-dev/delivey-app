class Order {
  constructor(id, ownerId, destination, status, note, createdAt, deliveryDate) {
    this.id = id;
    this.ownerId = ownerId;
    this.destination = destination;
    this.status = status;
    this.note = note;
    this.createdAt = createdAt;
    this.deliveryDate = deliveryDate;
  }
}
export default Order;
