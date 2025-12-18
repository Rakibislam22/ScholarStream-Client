import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const Analytics = () => {
    const axiosIn = useAxios();

    // users
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosIn.get("/users");
            return res.data;
        },
    });

    //scholarships
    const { data: scholarships = [] } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const res = await axiosIn.get("/scholarships");
            return res.data;
        },
    });

    // Total calculations
    const totalUsers = users.length;
    const totalScholarships = scholarships.length;

    const totalFees = scholarships.reduce(
        (sum, sc) =>
            sum +
            (Number(sc.applicationFees) || 0) +
            (Number(sc.serviceCharge) || 0),
        0
    );

    // Category-wise count
    const categoryMap = {};
    scholarships.forEach((sc) => {
        const cat = sc.scholarshipCategory || "Unknown";
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryData = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
    }));

    const COLORS = ["#0303b8", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

            {/* 🔹 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-200 p-6 rounded-lg shadow text-center">
                    <p className="text-gray-500">Total Users</p>
                    <h3 className="text-3xl font-bold">{totalUsers}</h3>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow text-center">
                    <p className="text-gray-500">Total Scholarships</p>
                    <h3 className="text-3xl font-bold">{totalScholarships}</h3>
                </div>

                <div className="bg-base-200 p-6 rounded-lg shadow text-center">
                    <p className="text-gray-500">Total Fees Collected</p>
                    <h3 className="text-3xl font-bold">
                        ${totalFees}
                    </h3>
                </div>
            </div>

            {/* 📊 Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-base-200 p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Scholarships by Category
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-base-200 p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">
                        Category Distribution
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {categoryData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
