import ticketModel from "../models/ticketModel.js";

class TicketDao {
    async create(data) {
        return ticketModel.create(data);
    }
}

export default TicketDao;
