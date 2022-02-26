import axios from "axios";

const uploadImage = async (file) => {
    if (!file) {
        return null;
    }

    try {
        const formData = new FormData();
        formData.append('upload_preset', 'vue-demo');
        formData.append('file', file);

        const url = 'https://api.cloudinary.com/v1_1/dyz79pgbd/image/upload'

        const response = await axios.post(url, formData)
        // console.log(response.data)

        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading image');
        console.error(error);
        return null;
    }
}

export default uploadImage;