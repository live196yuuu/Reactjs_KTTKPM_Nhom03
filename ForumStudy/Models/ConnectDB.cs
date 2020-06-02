using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ForumStudy.Models;

namespace ForumStudy.Models
{
    public class ConnectDB : DbContext
    {
        public virtual DbSet<Members> Members { get; set; }
        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Topics> Topics { get; set; }
        public virtual DbSet<Posts> Posts { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Messages> Messages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Data Source=ADMIN\administrator;Initial Catalog=ForumStudy;Integrated Security=True");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Members>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Members");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Account)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Type)
                    .IsRequired();
            });

            modelBuilder.Entity<Categories>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Categories");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.Ord)
                    .IsRequired();
            });

            modelBuilder.Entity<Topics>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Topics");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.IdCategory)
                    .IsRequired();
            });

            modelBuilder.Entity<Posts>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Posts");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.Message)
                    .IsRequired()
                    .IsUnicode(true);

                entity.Property(e => e.CreatedAt)
                    .IsRequired();

                entity.Property(e => e.IdMember)
                    .IsRequired();

                entity.Property(e => e.IdTopic)
                    .IsRequired();
            });

            modelBuilder.Entity<Comments>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Comments");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .IsUnicode(true);

                entity.Property(e => e.CreatedAt)
                    .IsRequired();

                entity.Property(e => e.IdMember)
                    .IsRequired();

                entity.Property(e => e.IdPost)
                    .IsRequired();
            });

            modelBuilder.Entity<Messages>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("Messages");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .IsUnicode(true);

                entity.Property(e => e.Sender)
                    .IsRequired();

                entity.Property(e => e.Receiver)
                    .IsRequired();

                entity.Property(e => e.CreatedAt)
                    .IsRequired();

                entity.Property(e => e.IsRead)
                    .IsRequired();
            });
        }
    }
}
