<template>
    <div>
        <h1 class="mb-10">Posts</h1>
        <user-posts :posts="posts"></user-posts>
    </div>
</template>

<script>

import UserPosts from '../components/UserPost.vue'

export default {
    data() {
        return {
            posts: [
                { id: 1, title:'The Cheesecake Factory: Use humor and great photos', description: 'The Cheesecake Factory is an American chain of restaurants, localized around the world. If you’re not familiar with it, you may recognize the name from the hit series The Big Bang Theory. They have a large following on Facebook and regularly post about food that’s on their menu.A picture of bread that gets more than 2300 likes and 243 comments, pretty impressive right? Of course, it helps that The Cheesecake Factory is a well-known chain of restaurants, with locations around the world. But what this example shows us is that a restaurant can do very well on social media by using nothing more than humor and quality pictures. Which keeps the audience entertained and attracts them to the restaurant by showing what’s on the menu.' },

                { id: 2, title:'Google: Share interesting customer stories', description: 'Google Maps is one of those things that doesn’t need much explaining. Most people know what it does, it helps you get from A to B. It can even find you a faster route when there’s loads of traffic up ahead. But a few days back, Google shared an interesting customer story on Twitter.What this Tweet shows us, is that user stories bring a product or service to life. It doesn’t have to be the most unique story in the world. If you show customers using your product or service and tell their story, others will be able relate to them. This doesn’t just give them insight into what your product or service can do for them, it also works as social proof. Because if other people are using it, and they’re happy about it, then people are more inclined to start using it too.' },
                
                { id: 3, title: 'Tony’s Chocolonely: Show people what’s happening', description: 'Tony Chocolonely is a Dutch company that sells chocolate. Their chocolate bars are quite popular and their mission is to make chocolate 100% slave-free. As they are opinionated, which fits their mission, they often get a lot of engagement on their social posts.As you can see this post has a lot of likes and comments. And what works well is that they have a photo of the Chocolate Bar accompanying their announcement. This shows people what they can expect and what the ‘store’ looks like. This is a great example of something you can easily do for your business. Share fun photos of what your place looks like, share photos of new products that just came in, or share any other visual updates to get people excited about visiting you.' }
            ]
        }
    },
    components: {
        UserPosts
    }
}
</script>