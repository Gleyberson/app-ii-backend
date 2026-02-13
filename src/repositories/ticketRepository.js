import TicketDao from "../dao/ticketDao.js";

class TicketRepository {
    constructor() {
        this.ticketDao = new TicketDao();
    }

    createTicket(data) {
        return this.ticketDao.create(data);
    }
}

export default TicketRepository;
