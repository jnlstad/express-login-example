USE [expressLogin]
GO
/****** Object:  Table [dbo].[t_permissions]    Script Date: 14/03/2025 10:36:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_permissions](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[permission_name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_t_permissions] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t_sessions]    Script Date: 14/03/2025 10:36:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_sessions](
	[id] [int] NOT NULL,
	[token] [nvarchar](128) NOT NULL,
	[valid_until] [datetime2](3) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t_user_permissions]    Script Date: 14/03/2025 10:36:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_user_permissions](
	[permission_id] [int] NOT NULL,
	[user_id] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t_users]    Script Date: 14/03/2025 10:36:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](128) NOT NULL,
	[password] [nvarchar](1024) NOT NULL,
	[age] [int] NOT NULL,
	[name] [nvarchar](128) NOT NULL,
	[address] [nvarchar](128) NOT NULL,
 CONSTRAINT [PK_t_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[t_sessions] ADD  CONSTRAINT [DF_t_sessions_valid_until]  DEFAULT (dateadd(hour,(1),sysutcdatetime())) FOR [valid_until]
GO
ALTER TABLE [dbo].[t_user_permissions]  WITH CHECK ADD  CONSTRAINT [FK_t_user_permissions_t_permissions] FOREIGN KEY([permission_id])
REFERENCES [dbo].[t_permissions] ([id])
GO
ALTER TABLE [dbo].[t_user_permissions] CHECK CONSTRAINT [FK_t_user_permissions_t_permissions]
GO
ALTER TABLE [dbo].[t_user_permissions]  WITH CHECK ADD  CONSTRAINT [FK_t_user_permissions_t_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[t_users] ([id])
GO
ALTER TABLE [dbo].[t_user_permissions] CHECK CONSTRAINT [FK_t_user_permissions_t_users]
GO
