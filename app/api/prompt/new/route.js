import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    //we can use create instead of new prompt as it wil directly save so we dont have to write prompt.save
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });
    // const newPrompt = new Prompt({ creator: userId, prompt, tag });
    // console.log(userId, prompt, tag);
    // await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to Create a New Prompt", { status: 500 });
  }
};
