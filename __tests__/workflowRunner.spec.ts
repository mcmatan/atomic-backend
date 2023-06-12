describe('work flow runner', () => {
    describe('runWorkflow()', () => {
        describe('Given called with workflow with 1 step', () => {
            it('should create a new job and step', () => {

            });
            it('should call the client back using the workflow step url', () => {

            })
            it('should return result back to client from original request', () => {

            })
        });
        // describe('Given called with workflow with 2 steps', () => {
        //     describe('Given first step call', () => {
        //         it('should create a new job and step', () => {
        //
        //         });
        //         it('should call the client back using the workflow step url', () => {
        //
        //         })
        //         it('should return result back to client from original request', () => {
        //
        //         })
        //     })
        // })
    })
})

/*

                Client -> Server HANGING
                Server -> Client 200
                Server -> Client again for number 1 200
                Client -> Server initial should receive response

                Client -> Server HANGING
                Server -> Client 200
                Server -> Client again for number 1 (Hanging)
                Client -> Server for number 2 200
                Server -> Client for number 2 200
                Server -> Client again for number 1 200
                Client -> Server initial should receive response


Client calls start work flow
We call step 1
Step 1 returns 200
We return client response (Because we know this is the first step)

                Client -> Server HANGING
                Server -> Client 200
                Server -> Client again for number 1 (Hanging)
                Client -> Server for number 2 200
                Server -> Client for number 2 200
                Server -> Client again for number 1 200
                Client -> Server initial should receive response

 */
