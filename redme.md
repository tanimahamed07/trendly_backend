Docs থেকে যা পাওয়া যায়
Docs-এ শুধু এটুকু আছে:
Dashboard pages:

User → My Profile, My Orders, My Reviews
Admin → Manage Users, Manage Products, Manage Orders, Analytics, Settings
Manager → আলাদা করে mention নেই, কিন্তু role হিসেবে আছে


Logic অনুযায়ী Permission ভাগ
কাজUserManagerAdminনিজের profile দেখা/edit✅✅✅Product দেখা✅✅✅Review দেওয়া✅✅✅Order করা✅✅✅নিজের orders দেখা✅✅✅Product create/edit/delete❌✅✅সব Orders manage করা❌✅✅যেকোনো Review delete❌✅✅সব Users দেখা❌❌✅User delete করা❌❌✅User role বদলানো❌❌✅Analytics দেখা❌❌✅Settings❌❌✅

সহজ কথায়
Manager = Product + Order + Review manage করতে পারে, কিন্তু User manage করতে পারে না
Admin = সব কিছু করতে পারে
