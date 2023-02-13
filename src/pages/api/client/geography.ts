import User from "@/lib/models/User";
import db from "@/lib/mongodb"
import { NextApiRequest, NextApiResponse } from "next"
const getCountryISO3 = require("country-iso-2-to-3");
// import getCountryIso3 from "country-iso-2-to-3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    await db.dbConnect()
    switch (method) {
        case 'GET':
            try {
                const users = await User.find();

                const mappedLocations = users.reduce((acc, { country }) => {
                    const countryISO3 = getCountryISO3(country);
                    if (!acc[countryISO3]) {
                        acc[countryISO3] = 0;
                    }
                    acc[countryISO3]++;
                    return acc;
                }, {});

                const formattedLocations = Object.entries(mappedLocations).map(
                    ([country, count]) => {
                        return { id: country, value: count };
                    }
                );

                res.status(200).json(formattedLocations);
            } catch (error: any) {
                res.status(404).json({ message: error.message });
            }
    }
    await db.dbDisconnect()
}