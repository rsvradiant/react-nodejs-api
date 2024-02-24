
export async function getHealthTopics() {

    try{
        const response = await fetch('/api/wellnesstopics');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}
