export const pricingPlans = [
    {
        title: "Free Plan",
        price: 0,
        description: "For individuals and hobbyists",
        features: [
            "Up to 3 forms per month",
            "Basic AI forms builder",
            "Basic form customizations",
            "Data export in CSV format",
        ],
        isPopular: false,
    },
    {
        title: "Basic Plan",
        price: 39,
        description: "For startups",
        features: [
            "Up to 10 forms per month",
            "Advanced AI forms builder",
            "Advanced form customizations",
            "Data export in CSV and JSON format",
        ],
        isPopular: true,
    },
    {
        title: "Pro Plan",
        price: 89,
        description: "For businesses",
        features: [
            "Unlimited forms per month",
            "Pro AI forms builder",
            "Full form customizations",
            "Data export in multiple formats",
            "Priority support",
        ],
        isPopular: false,
    },
];
