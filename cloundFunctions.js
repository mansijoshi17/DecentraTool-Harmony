Moralis.Cloud.define("getRoles", async (request) => {
  const query = new Moralis.Query("Roles");
  const results = await query.find({ useMasterKey: true });
  return results;
});

Moralis.Cloud.define("getMemberships", async (request) => {
  const query = new Moralis.Query("Memberships");
  const results = await query.find({ useMasterKey: true });
  return results;
});

Moralis.Cloud.define("getMembers", async (request) => {
  const query = new Moralis.Query("Members");
  const results = await query.find({ useMasterKey: true });
  return results;
});

Moralis.Cloud.define("getDocs", async (request) => {
  const query = new Moralis.Query("Docs");
  const results = await query.find({ useMasterKey: true });
  return results;
});

Moralis.Cloud.define("getDaos", async (request) => {
  const query = new Moralis.Query("DAOs");
  const results = await query.find({ useMasterKey: true });
  return results;
});