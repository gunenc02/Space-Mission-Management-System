package tr.edu.bilkent.spacemission.controller;

import org.springframework.web.bind.annotation.*;
import tr.edu.bilkent.spacemission.entity.Bid;
import tr.edu.bilkent.spacemission.dto.BidDto;
import tr.edu.bilkent.spacemission.service.BidService;

import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController {
    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    /**
     * Get bid by id
     * @param id bid id
     * @return bid
     */
    @GetMapping("/{id}")
    public BidDto getBid(@PathVariable long id) {
        Bid bid = bidService.getBid(id);
        return convertEntityToDto(bid);
    }

    /**
     * Get all bids received by the user with the given id
     * @param userId user id
     * @return list of bids
     */
    @GetMapping("/receivedList/{userId}")
    public List<Bid> getReceivedBids(@PathVariable long userId) {
        return bidService.getReceivedBids(userId);
    }

    /**
     * Get all bids offered by the user with the given id
     * @param userId user id
     * @return list of bids
     */
    @GetMapping("/offeredList/{userId}")
    public List<Bid> getOfferedBids(@PathVariable long userId) {
        return bidService.getOfferedBids(userId);
    }

    /**
     * Creates a new bid
     * @param bidDto bid to be created
     */
    @PostMapping("/offer")
    public void offerBid(@RequestBody BidDto bidDto) {
        Bid bid = convertDtoToEntity(bidDto);
        bidService.offerBid(bid);
    }

    /**
     * Sets the status of the bid with the given id to "approved"
     * @param id bid id
     */
    @PutMapping("/approve/{id}")
    public void approveBid(@PathVariable long id) {
        bidService.approveBid(id);
    }

    /**
     * Sets the status of the bid with the given id to "rejected"
     * @param id bid id
     */
    @PutMapping("/reject/{id}")
    public void rejectBid(@PathVariable long id) {
        bidService.rejectBid(id);
    }

    /**
     * Removes the bid with the given id
     * @param id bid id
     */
    @DeleteMapping("/remove/{id}")
    public void removeBid(@PathVariable long id) {
        bidService.removeBid(id);
    }

    private BidDto convertEntityToDto (Bid bid) {
        BidDto bidDto = new BidDto();
        bidDto.setId(bid.getId());
        bidDto.setPrice(bid.getPrice());
        bidDto.setOfferDate(bid.getOfferDate());
        bidDto.setDeadline(bid.getDeadline());
        bidDto.setDescription(bid.getDescription());
        bidDto.setStatus(bid.getStatus());
        bidDto.setOffererId(bid.getOffererId());
        bidDto.setReceiverId(bid.getReceiverId());
        bidDto.setMissionId(bid.getMissionId());
        return bidDto;
    }

    private Bid convertDtoToEntity (BidDto bidDto) {
        Bid bid = new Bid();
        bid.setId(bidDto.getId());
        bid.setPrice(bidDto.getPrice());
        bid.setOfferDate(bidDto.getOfferDate());
        bid.setDeadline(bidDto.getDeadline());
        bid.setDescription(bidDto.getDescription());
        bid.setStatus(bidDto.getStatus());
        bid.setOffererId(bidDto.getOffererId());
        bid.setReceiverId(bidDto.getReceiverId());
        bid.setMissionId(bidDto.getMissionId());
        return bid;
    }
}
