package tr.edu.bilkent.spacemission.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import tr.edu.bilkent.spacemission.entity.Bid;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BidRepository {
    private final JdbcTemplate jdbcTemplate;
    private final Connection connection;

    public BidRepository(JdbcTemplate jdbcTemplate, DataSource dataSource) throws SQLException {
        this.jdbcTemplate = jdbcTemplate;
        this.connection = dataSource.getConnection();
    }

    /**
     * This method returns the bid with the given id
     *
     * @param id Id of the bid
     * @return Bid object
     */
    public Bid getBid(long id) {
        String query = "SELECT * FROM bid WHERE bid_id = ?;";
        return jdbcTemplate.queryForObject(query, (rs, rowNum) -> {
            Bid bid = new Bid();
            bid.setId(rs.getLong("bid_id"));
            bid.setPrice(rs.getDouble("price"));
            bid.setOfferDate(rs.getDate("offer_date"));
            bid.setDeadline(rs.getDate("deadline"));
            bid.setDescription(rs.getString("description"));
            bid.setStatus(rs.getString("status"));
            bid.setOffererId(rs.getLong("offerer_id"));
            bid.setReceiverId(rs.getLong("receiver_id"));
            bid.setMissionId(rs.getLong("mission_id"));
            return bid;
        }, id);
    }

    /**
     * This method returns all bids received by the user with the given id
     *
     * @param userId Id of the user
     * @return List of Bid objects
     */
    public List<Bid> getReceivedBids(long userId) {
        ArrayList<Bid> bids = new ArrayList<>();
        try {
            var ps = connection.prepareStatement("SELECT * FROM bid WHERE receiver_id = ?");
            ps.setLong(1, userId);
            var rs = ps.executeQuery();
            while (rs.next()) {
                Bid bid = new Bid();
                bid.setId(rs.getLong("bid_id"));
                bid.setPrice(rs.getDouble("price"));
                bid.setOfferDate(rs.getDate("offer_date"));
                bid.setDeadline(rs.getDate("deadline"));
                bid.setDescription(rs.getString("description"));
                bid.setStatus(rs.getString("status"));
                bid.setOffererId(rs.getLong("offerer_id"));
                bid.setReceiverId(rs.getLong("receiver_id"));
                bid.setMissionId(rs.getLong("mission_id"));
                bids.add(bid);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return bids;
    }

    /**
     * This method returns all bids offered by the user with the given id
     *
     * @param userId Id of the user
     * @return List of Bid objects
     */
    public List<Bid> getOfferedBids(long userId) {
        ArrayList<Bid> bids = new ArrayList<>();
        try {
            var ps = connection.prepareStatement("SELECT * FROM bid WHERE offerer_id = ?");
            ps.setLong(1, userId);
            var rs = ps.executeQuery();
            while (rs.next()) {
                Bid bid = new Bid();
                bid.setId(rs.getLong("bid_id"));
                bid.setPrice(rs.getDouble("price"));
                bid.setOfferDate(rs.getDate("offer_date"));
                bid.setDeadline(rs.getDate("deadline"));
                bid.setDescription(rs.getString("description"));
                bid.setStatus(rs.getString("status"));
                bid.setOffererId(rs.getLong("offerer_id"));
                bid.setReceiverId(rs.getLong("receiver_id"));
                bid.setMissionId(rs.getLong("mission_id"));
                bids.add(bid);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return bids;
    }

    /**
     * This methods creates a new bid with the status of "pending"
     *
     * @param bid Bid object
     */
    public void offerBid(Bid bid) {
        try {
            boolean offererHasMoney = false;
            PreparedStatement psHasMoney = connection.prepareStatement(
                    "SELECT * FROM company WHERE company_id = ? AND money >= ?;"
            );
            psHasMoney.setLong(1, bid.getOffererId());
            psHasMoney.setDouble(2, bid.getPrice());

            if(psHasMoney.executeQuery().next()){
                offererHasMoney = true;
            }

            if (offererHasMoney) {
                //first we delete the existing entry if the offerer has already offered a bid for this mission which has pending status
                PreparedStatement psDelete = connection.prepareStatement(
                        "DELETE FROM bid " +
                                "WHERE offerer_id = ? AND receiver_id = ? AND mission_id = ? AND status = 'pending';"
                );
                psDelete.setLong(1, bid.getOffererId());
                psDelete.setLong(2, bid.getReceiverId());
                psDelete.setLong(3, bid.getMissionId());
                psDelete.executeUpdate();

                PreparedStatement ps = connection.prepareStatement("INSERT INTO bid (price, offer_date, deadline, description, status, offerer_id, receiver_id, mission_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                ps.setDouble(1, bid.getPrice());
                ps.setDate(2, bid.getOfferDate());
                ps.setDate(3, bid.getDeadline());
                ps.setString(4, bid.getDescription());
                ps.setString(5, "pending");
                ps.setLong(6, bid.getOffererId());
                ps.setLong(7, bid.getReceiverId());
                ps.setLong(8, bid.getMissionId());
                ps.executeUpdate();
            }
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    /**
     * This method sets the status of the bid with the given id to "approved"
     *
     * @param id Id of the bid
     */
    public void approveBid(long id) {
        try {
            // Update the status of the bid
            String query = "UPDATE bid SET status = 'approved' WHERE bid_id = ?;";
            PreparedStatement ps = connection.prepareStatement(query);
            ps.setLong(1, id);
            ps.executeUpdate();

            // Get the bid
            Bid bid = getBid(id);

            System.out.println("Bid details: " + bid);


            // Insert the transaction
            String transactionQuery = "INSERT INTO transaction (fromcompany_id, tocompany_id, transaction_amount) VALUES (?, ?, ?);";
            PreparedStatement ps2 = connection.prepareStatement(transactionQuery);
            ps2.setLong(1, bid.getReceiverId());
            ps2.setLong(2, bid.getOffererId());
            ps2.setDouble(3, bid.getPrice());
            ps2.executeUpdate();
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
        }
    }

    /**
     * This method sets the status of the bid with the given id to "rejected"
     * @param id Id of the bid
     */
    public void rejectBid(long id) {
        String query = "UPDATE bid SET status = 'rejected' WHERE bid_id = ?;";
        jdbcTemplate.update(query, id);
    }

    /**
     * This method removes the bid with the given id
     * @param id Id of the bid
     */
    public void removeBid(long id) {
        String query = "DELETE FROM bid WHERE bid_id = ?;";
        jdbcTemplate.update(query, id);
    }

}
