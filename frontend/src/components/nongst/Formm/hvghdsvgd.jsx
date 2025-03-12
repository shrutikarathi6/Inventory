
return (
    <>
    <Navbar/>
    <div className="backgroundhome">
      <div className="foregroundhome">
        <div className='scroll-container'>
        <h2 style={{ marginLeft: "20%", marginRight: "20%" }}>Add Details For NonGST</h2>

       
        <form onSubmit={handleSubmit} className="form-container">

        <div className="bajubaju">
          {/* voucher No */}
        <div className="input-container">
            <label className="input-label">Voucher No</label>
            <input
              type="number"
              name="voucherno"
              placeholder="Enter Voucher No"
              className="input-field"
              value={formData.voucherno}
              onChange={handleChange}
      
            />
          </div>

          {/* voucher type */}
          <div className="input-container">
            <label className="input-label">Vch Type:</label>
            <input
              type="text"
              className="input-field"
              value={"Journal"}
              readOnly
            />
          </div>
         

           {/* Date */}
        <div className="input-container">
            <label className="input-label">Date</label>
            <input
              type="date"
              name="date"
              placeholder="Enter date"
              className="input-field"
              value={formData.date}
              onChange={handleChange}
              required
      
            />
          </div>
          </div>


          <div className="bajubaju">

            {/* Ledger Name */}
           <div className="input-container">
            <label className="input-label">Dr Ledger Name:</label>
            <input
              type="text"
              name="ledgername"
              placeholder="Enter Dr Ledger Name"
              className="input-field"
              value={formData.ledgername}
              onChange={handleChange}
              required
            />
            </div>

            {/* Dr Amount */}
            <div className="input-container">
              <label className="input-label">Dr Amount</label>
              <input
                type="number"
                name="dramount"
                placeholder="Enter Amount"
                className="input-field"
                value={formData.dramount}
                onChange={handleChange}
                step="any" // Allows decimal values
                required
              />
            </div>
            </div>


            <div className="bajubaju">
               {/* Reference No */}
          <div className="input-container">
            <label className="input-label">Reference No</label>
            <input
              type="text"
              name="referenceno"
              placeholder="Enter Reference No"
              className="input-field"
              value={formData.referenceno}
              onChange={handleChange}
              required
      
            />
          </div>

          <div className="input-container">
              <label className="input-label">Reference Amount</label>
              <input
                type="number"
                name="referenceamount"
                placeholder="Enter Reference Amount"
                className="input-field"
                value={formData.referenceamount}
                onChange={handleChange}
                step="any" // Allows decimal values
                
              />
            </div>
            </div>
           
            {/* Cr Ledger Name*/}
          <div className="input-container">
            <label className="input-label">Cr Ledger Name</label>
            <input
              type="text"
              name="crledgername"
              placeholder="Enter Cr Ledger Name"
              className="input-field1"
              value={formData.crledgername}
              onChange={handleChange}
      
            />
          </div>

           {/* Cr Amount*/}
           <div className="input-container">
            <label className="input-label">Cr Amount</label>
            <input
              type="number"
              name="cramount"
              placeholder="Enter Cr Amount"
              className="input-field1"
              value={formData.cramount}
              onChange={handleChange}
      
            />
          </div>

          {/* Cr Cost center*/}
          <div className="input-container">
            <label className="input-label">Cr Cost Center</label>
            <input
              type="text"
              name="crcostcenter"
              placeholder="Enter Cr Cost Center"
              className="input-field1"
              value={formData.crcostcenter}
              onChange={handleChange}
      
            />
          </div>

          {/* CrCost Center Amount*/}
          <div className="input-container">
            <label className="input-label">Cr Cost Center Amount</label>
            <input
              type="number"
              name="crcostcenteramount"
              placeholder="Enter Cr Cost Center Amount"
              className="input-field1"
              value={formData.crcostcenteramount}
              onChange={handleChange}
      
            />
          </div>
            
        
           
           {/* Km */}
           <div className="input-container">
              <label className="input-label">Kilometer</label>
              <input
                type="number"
                name="km"
                placeholder="Enter km"
                className="input-field1"
                value={formData.km}
                onChange={handleChange}
                step="any"
              />
            </div>
           


            {/* category*/}
            <div className="bajubaju">
           <div className="input-container">
            <label className="input-label">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              className="input-field1"
              value={formData.category}
              onChange={handleChange}
      
            />
          </div>


          {/* Subcategory*/}
          <div className="input-container">
            <label className="input-label">Subcategory</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Enter Subcategory"
              className="input-field1"
              value={formData.subcategory}
              onChange={handleChange}
      
            />
          </div>
          </div>

          {/* Narration*/}
          <div className="bajubaju">
          <div className="input-container">
            <label className="input-label">Narration</label>
            <input
              type="text"
              name="narration"
              placeholder="Enter Narration"
              className="input-field1"
              value={formData.narration}
              onChange={handleChange}
      
            />
          </div>
          

              {/* details*/}
              <div className="input-container">
            <label className="input-label">Details</label>
            <input
              type="text"
              name="details"
              placeholder="Enter Details"
              className="input-field1"
              value={formData.details}
              onChange={handleChange}
      
            />
          </div>
          </div>

          {/* Dr Cost center*/}
          <div className="input-container">
            <label className="input-label">Dr Cost Center</label>
            <input
              type="text"
              name="drcostcenter"
              placeholder="Enter Dr Cost Center"
              className="input-field1"
              value={formData.drcostcenter}
              onChange={handleChange}
      
            />
          </div>
           {/* Dr Cost center Amount*/}
          <div className="input-container">
            <label className="input-label">Dr Cost Center Amount</label>
            <input
              type="text"
              name="drcostcenteramount"
              placeholder="Enter Dr Cost Center Amount"
              className="input-field1"
              value={formData.drcostcenteramount}
              onChange={handleChange}
      
            />
          </div>

          

           

            
           {/* Tally Import Status*/}
           <div className="input-container">
            <label className="input-label">Tally Import Status</label>
            <input
              type="text"
              name="tallyimportstatus"
              placeholder="Enter Tally Import Status"
              className="input-field"
              value={formData.tallyimportstatus}
              onChange={handleChange}
              style={{ width: "200%", height: "20px", marginTop: "7px" }}
      
            />
          </div>


