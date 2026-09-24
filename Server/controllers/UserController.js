import sql from "../configs/db.js";


// =====================================================
// GET USER CREATIONS
// =====================================================

export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        const creations = await sql`
            SELECT *
            FROM creations
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        res.json({
            success: true,
            creations,
        });

    } catch (error) {
        console.error("Get User Creations Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// GET PUBLISHED CREATIONS
// =====================================================

export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`
            SELECT *
            FROM creations
            WHERE publish = true
            ORDER BY created_at DESC
        `;

        res.json({
            success: true,
            creations,
        });

    } catch (error) {
        console.error("Get Published Creations Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// TOGGLE LIKE CREATION
// =====================================================

export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;

        if (!id) {
            return res.json({
                success: false,
                message: "Creation ID is required",
            });
        }

        const [creation] = await sql`
            SELECT *
            FROM creations
            WHERE id = ${id}
        `;

        if (!creation) {
            return res.json({
                success: false,
                message: "Creation not found",
            });
        }

        const currentLikes = Array.isArray(creation.likes)
            ? creation.likes
            : [];

        const userIdStr = userId.toString();

        let updatedLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter(
                (user) => user !== userIdStr
            );

            message = "Creation unliked";
        } else {
            updatedLikes = [
                ...currentLikes,
                userIdStr,
            ];

            message = "Creation liked";
        }

        const formattedArray = `{${updatedLikes.join(",")}}`;

        const [updatedCreation] = await sql`
            UPDATE creations
            SET likes = ${formattedArray}::text[]
            WHERE id = ${id}
            RETURNING *
        `;

        res.json({
            success: true,
            message,
            creation: updatedCreation,
        });

    } catch (error) {
        console.error("Toggle Like Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// DELETE ONE CREATION
// =====================================================

export const deleteCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.params;

        if (!id) {
            return res.json({
                success: false,
                message: "Creation ID is required",
            });
        }

        const [creation] = await sql`
            SELECT *
            FROM creations
            WHERE id = ${id}
            AND user_id = ${userId}
        `;

        if (!creation) {
            return res.json({
                success: false,
                message: "Creation not found",
            });
        }

        await sql`
            DELETE FROM creations
            WHERE id = ${id}
            AND user_id = ${userId}
        `;

        res.json({
            success: true,
            message: "Creation deleted successfully",
            id,
        });

    } catch (error) {
        console.error("Delete Creation Error:", error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// DELETE ALL USER CREATIONS
// =====================================================

export const deleteAllCreations = async (req, res) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.json({
                success: false,
                message: "User authentication required",
            });
        }

        const deletedCreations = await sql`
            DELETE FROM creations
            WHERE user_id = ${userId}
            RETURNING id
        `;

        res.json({
            success: true,
            message: "All creations deleted successfully",
            deletedCount: deletedCreations.length,
        });

    } catch (error) {
        console.error(
            "Delete All Creations Error:",
            error
        );

        res.json({
            success: false,
            message: error.message,
        });
    }
};