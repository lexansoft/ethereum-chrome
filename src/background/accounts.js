// Account management


module.exports = new function( max_total, expiration_time ) {
    this.isLocked = function( addr ) {
        return true;
    }
}()