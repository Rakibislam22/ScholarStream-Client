import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
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
    const { theme } = use(AuthContext);

    // users
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosIn.get("/users");
            return res.data;
        },
    });

    // scholarships
    const { data: scholarships = [] } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const res = await axiosIn.get("/analytics/scholarships");
            return res.data;
        },
    });

    // totals
    const totalUsers = users.length;
    const totalScholarships = scholarships.length;

    const totalFees = scholarships.reduce(
        (sum, sc) =>
            sum +
            (Number(sc.applicationFees) || 0) +
            (Number(sc.serviceCharge) || 0),
        0
    );

    // category-wise count
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

    const cardBg =
        theme === "dark"
            ? "bg-gray-900 border border-gray-700 text-gray-200"
            : "bg-base-200 text-gray-900";

    const mutedText = theme === "dark" ? "text-gray-400" : "text-gray-500";

    return (
        <div className="space-y-6">
            <h2
                className={`text-2xl font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
            >
                Analytics Dashboard
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-6 rounded-lg shadow text-center ${cardBg}`}>
                    <p className={mutedText}>Total Users</p>
                    <h3 className="text-3xl font-bold">{totalUsers}</h3>
                </div>

                <div className={`p-6 rounded-lg shadow text-center ${cardBg}`}>
                    <p className={mutedText}>Total Scholarships</p>
                    <h3 className="text-3xl font-bold">{totalScholarships}</h3>
                </div>

                <div className={`p-6 rounded-lg shadow text-center ${cardBg}`}>
                    <p className={mutedText}>Total Fees Collected</p>
                    <h3 className="text-3xl font-bold">${totalFees}</h3>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className={`p-4 rounded-lg shadow ${cardBg}`}>
                    <h3 className="font-semibold mb-4">
                        Scholarships by Category
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                            />
                            <XAxis
                                dataKey="name"
                                stroke={theme === "dark" ? "#9ca3af" : "#374151"}
                            />
                            <YAxis
                                allowDecimals={false}
                                stroke={theme === "dark" ? "#9ca3af" : "#374151"}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme === "dark" ? "#111827" : "#ffffff",
                                    border:
                                        theme === "dark"
                                            ? "1px solid #374151"
                                            : "1px solid #e5e7eb",
                                    color:
                                        theme === "dark" ? "#e5e7eb" : "#111827",
                                }}
                            />
                            <Bar dataKey="value" fill="#0303b8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className={`p-4 rounded-lg shadow ${cardBg}`}>
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
                            <Tooltip
                                contentStyle={{
                                    backgroundColor:
                                        theme === "dark" ? "#111827" : "#ffffff",
                                    border:
                                        theme === "dark"
                                            ? "1px solid #374151"
                                            : "1px solid #e5e7eb",
                                    color:
                                        theme === "dark" ? "#e5e7eb" : "#111827",
                                }}
                            />
                            <Legend
                                wrapperStyle={{
                                    color:
                                        theme === "dark"
                                            ? "#e5e7eb"
                                            : "#111827",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
