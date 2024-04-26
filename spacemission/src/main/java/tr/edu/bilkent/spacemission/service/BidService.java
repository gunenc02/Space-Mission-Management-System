package tr.edu.bilkent.spacemission.service;

import org.springframework.stereotype.Service;
import tr.edu.bilkent.spacemission.entity.Bid;
import tr.edu.bilkent.spacemission.repository.BidRepository;

import java.util.List;

@Service
public class BidService {
    private final BidRepository bidRepository;

    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public Bid getBid(long id) {
        return bidRepository.getBid(id);
    }

    public List<Bid> getReceivedBids(long userId) {
        return bidRepository.getReceivedBids(userId);
    }

    public List<Bid> getOfferedBids(long userId) {
        return bidRepository.getOfferedBids(userId);
    }

    public void offerBid(Bid bid) {
        bidRepository.offerBid(bid);
    }

    public void approveBid(long id) {
        bidRepository.approveBid(id);
    }

    public void rejectBid(long id) {
        bidRepository.rejectBid(id);
    }

    public void removeBid(long id) {
        bidRepository.removeBid(id);
    }
}
