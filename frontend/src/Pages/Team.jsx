import React, { useState } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";

export const Team = () => {
  const teamMembers = [
    {
      name: "Dharmesh Yadav",
      role: "Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "UI/UX enthusiast with expertise in modern frontend technologies and design systems.",
      email: "yadavDharmesh2306@gmail.com",

      github: "https://github.com/Dharmesh-yadavo?",
      linkedin: "https://www.linkedin.com/in/dharmesh-yadavoprofile/",
    },
    {
      name: "Aryan Shrivastava",
      role: "Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Passionate about creating scalable web applications and innovative solutions.",
      email: "reachtoaryan29@gmail.com",

      github: "https://github.com/ShrivastvAryan",
      linkedin: "https://www.linkedin.com/in/aryanshrivastava290605/",
    },
    {
      name: "Drishti Goel",
      role: "UI/UX & Database",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "UI/UX and database developer maintaining sponsor records and crafting seamless user experiences for the platform.",
      email: "drishti00982@gmail.com",

      github: "https://github.com/drishti-g",
      linkedin: "https://www.linkedin.com/in/drishti-goel-594967326/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-center pt-25">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white  leading-tight">
            Meet Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}
              Team
            </span>
          </h1>

          <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of developers dedicated to creating
            innovative solutions. Whether you have a project in mind or want to
            collaborate, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section id="team" className="relative ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-white/30"
                  />
                  {/* <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div> */}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-white/80 font-medium mb-4">{member.role}</p>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href={member.github}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
